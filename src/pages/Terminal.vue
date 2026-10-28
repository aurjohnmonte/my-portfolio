<template>
  <div
    class="term"
    role="dialog"
    aria-label="Terminal"
    @click="focusInput"
    @keydown.esc="close"
  >
    <!-- Title bar -->
    <header class="term-bar">
      <span class="dot dot-close" aria-hidden="true"></span>
      <span class="dot dot-min" aria-hidden="true"></span>
      <span class="dot dot-max" aria-hidden="true"></span>
      <span class="term-title">guest@portfolio: {{ cwdLabel }}</span>
      <button
        type="button"
        class="close-btn"
        aria-label="Close terminal"
        @click.stop="close"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
          <path d="M18 6L6 18M6 6l12 12"/>
        </svg>
      </button>
    </header>

    <!-- Output + input -->
    <div class="term-body" ref="body" aria-live="polite">
      <div v-for="(l, i) in lines" :key="i" class="line">
        <template v-if="l.input">
          <span class="prompt"><span class="prompt-user">guest@portfolio:</span>{{ l.cwd }}$</span>
          <span class="echo-text">{{ l.text }}</span>
        </template>
        <template v-else>
          <span
            v-for="(p, j) in l.parts"
            :key="j"
            :class="['out-part', p.cls]"
          >{{ p.text }}</span>
        </template>
      </div>

      <form class="line input-line" @submit.prevent="run">
        <span class="prompt"><span class="prompt-user">guest@portfolio:</span>{{ cwdLabel }}$</span>
        <input
          ref="input"
          v-model="input"
          type="text"
          class="term-input"
          aria-label="Terminal input"
          autocomplete="off"
          autocapitalize="off"
          autocorrect="off"
          spellcheck="false"
          @focus="scrollToBottom"
          @keydown.up.prevent="historyPrev"
          @keydown.down.prevent="historyNext"
          @keydown.tab.prevent="autocomplete"
          @keydown.ctrl.l.prevent="clear"
        />
      </form>
    </div>
  </div>
</template>

<script>
/* ───────────────────────────────────────────────
   EDIT THIS: your info + the fake file system
   Strings are files, objects are folders.
   Names starting with "." are hidden (use ls -a).
─────────────────────────────────────────────── */
const PROFILE = {
  name: "Aurjohn Cris C. Monte",
  role: "Full-Stack Developer",
};

const FILES = {
  "about.txt":
    `Hi, I'm ${PROFILE.name}, a ${PROFILE.role}.\n` +
    "I build web apps and enjoy turning messy problems into simple tools.",
  "skills.txt":
    "Frontend : Vue, JavaScript, HTML, CSS\n" +
    "Backend  : Node.js, Laravel, ASP.NET Core, REST APIs\n" +
    "Database : MySQL, MongoDB\n" +
    "Tools    : Git, Docker, Linux",
  "contact.txt":
    "Email    : aurjohnmonte2003@example.com\n" +
    "GitHub   : github.com/aurjohnmonte\n" +
    "LinkedIn : linkedin.com/in/aurjohncris.monte",
  projects: {
    "ai-driven-survey.md":
      "AI-Driven Survey System\n" +
      "A client satisfaction survey platform for CSU Cabadbaran Campus. It uses sentiment analysis to turn feedback into insights that support better decision making.\n" +
      "Stack: Laravel, Vue, MySQL, XLM-RoBERTa (pretrained model), Mapbox",
    "e-commerce.md":
      "E-Commerce System\n" +
      "An online marketplace for handmade wooden products from Butuan sellers. Sellers showcase their items, and buyers find them easily through map integration and real-time navigation, with built-in messaging and notifications.",
    "qr-inventory.md":
      "QR-Based Inventory Monitoring\n" +
      "An inventory system for Caraga State University that tracks and monitors university assets through QR codes, with separate access for administrators and staff.",
    "matacbr-app.md":
      "MataCBR Mobile App\n" +
      "A mobile app for capturing and sharing photos of Cabadbaran. Only photos taken within the municipality are allowed, so residents can see what's happening around them and alert one another to local conditions.",
  },
  ".secret": "You found the hidden file. Let's work together :)",
};

const COMMANDS = [
  "help", "ls", "cd", "cat", "pwd", "whoami", "about", "skills",
  "projects", "contact", "echo", "date", "history", "clear", "sudo", "exit",
];

const MAX_LINES = 300;

export default {
  name: "Terminal",

  emits: ["close"],

  data() {
    return {
      lines: [],
      input: "",
      cwd: [],
      cmdHistory: [],
      histIndex: -1,
      draft: "",
    };
  },

  computed: {
    cwdLabel() {
      return "~" + (this.cwd.length ? "/" + this.cwd.join("/") : "");
    },
  },

  mounted() {
    this.welcome();
    this.$nextTick(() => {
      // Only auto-focus on devices with a real pointer, so phones
      // don't get the keyboard popping up the moment it opens.
      const canHover =
        window.matchMedia && window.matchMedia("(hover: hover)").matches;
      if (canHover) this.focusInput();
    });
  },

  methods: {
    close() {
      this.$emit("close");
    },

    welcome() {
      this.add("Welcome to my portfolio terminal.", "is-accent");
      this.add("Type 'help' to see what you can do.", "is-muted");
      this.add("");
    },

    /* ── Output helpers ── */
    add(text = "", cls = "") {
      this.pushLine({ parts: [{ text, cls }] });
    },

    addMany(text, cls = "") {
      String(text).split("\n").forEach((t) => this.add(t, cls));
    },

    pushLine(line) {
      this.lines.push(line);
      if (this.lines.length > MAX_LINES) {
        this.lines.splice(0, this.lines.length - MAX_LINES);
      }
    },

    focusInput() {
      const sel = window.getSelection && window.getSelection().toString();
      if (sel) return; // don't steal focus while the user is copying text
      if (this.$refs.input) this.$refs.input.focus();
    },

    scrollToBottom() {
      this.$nextTick(() => {
        const el = this.$refs.body;
        if (el) el.scrollTop = el.scrollHeight;
      });
    },

    /* ── Running commands ── */
    run() {
      const raw = this.input;
      const cmdline = raw.trim();

      this.pushLine({ input: true, cwd: this.cwdLabel, text: raw });

      this.input = "";
      this.histIndex = -1;
      this.draft = "";

      if (cmdline) {
        this.cmdHistory.push(cmdline);
        const [cmd, ...args] = cmdline.split(/\s+/);
        this.execute(cmd.toLowerCase(), args);
      }

      this.scrollToBottom();
    },

    execute(cmd, args) {
      switch (cmd) {
        case "help":
          this.addMany("Available commands:", "is-accent");
          [
            ["help", "Show this list"],
            ["ls [-a]", "List files"],
            ["cd <dir>", "Change directory"],
            ["cat <file>", "Read a file"],
            ["pwd", "Show current directory"],
            ["whoami", "Who's visiting?"],
            ["about", "A little about me"],
            ["skills", "What I work with"],
            ["projects", "Things I've built"],
            ["contact", "How to reach me"],
            ["echo <text>", "Print text"],
            ["date", "Show date and time"],
            ["history", "Previous commands"],
            ["clear", "Clear the screen (Ctrl+L)"],
            ["exit", "Close the terminal"],
          ].forEach(([c, d]) => this.add("  " + c.padEnd(13) + d));
          this.add("");
          this.add("Tip: Tab autocompletes, ↑ ↓ browse history.", "is-muted");
          break;

        case "ls":
          this.cmdLs(args);
          break;

        case "cd":
          this.cmdCd(args[0]);
          break;

        case "cat":
          this.cmdCat(args[0]);
          break;

        case "pwd":
          this.add("/home/guest" + (this.cwd.length ? "/" + this.cwd.join("/") : ""));
          break;

        case "whoami":
          this.add("guest");
          break;

        case "about":
          this.addMany(FILES["about.txt"]);
          break;

        case "skills":
          this.addMany(FILES["skills.txt"]);
          break;

        case "contact":
          this.addMany(FILES["contact.txt"]);
          break;

        case "projects":
          this.cmdLs(["projects"]);
          this.add("Use 'cat projects/<file>' to read more.", "is-muted");
          break;

        case "echo":
          this.add(args.join(" "));
          break;

        case "date":
          this.add(new Date().toString());
          break;

        case "history":
          this.cmdHistory.forEach((c, i) =>
            this.add(String(i + 1).padStart(3) + "  " + c)
          );
          break;

        case "clear":
          this.clear();
          break;

        case "sudo":
          this.add("guest is not in the sudoers file. This incident will be reported.", "is-err");
          break;

        case "exit":
          this.add("logout", "is-muted");
          setTimeout(this.close, 250);
          break;

        default:
          this.add(`command not found: ${cmd}. Type 'help' for a list.`, "is-err");
      }
    },

    clear() {
      this.lines = [];
    },

    /* ── Fake file system ── */
    resolve(path = ".") {
      const parts =
        path.startsWith("~") || path.startsWith("/") ? [] : [...this.cwd];

      path
        .replace(/^~/, "")
        .split("/")
        .filter(Boolean)
        .forEach((seg) => {
          if (seg === ".") return;
          if (seg === "..") parts.pop();
          else parts.push(seg);
        });

      let node = FILES;
      for (const p of parts) {
        if (
          node &&
          typeof node === "object" &&
          Object.prototype.hasOwnProperty.call(node, p)
        ) {
          node = node[p];
        } else {
          return null;
        }
      }
      return { node, parts };
    },

    cmdLs(args) {
      const showHidden = args.some((a) => a.startsWith("-") && a.includes("a"));
      const target = args.find((a) => !a.startsWith("-")) || ".";
      const res = this.resolve(target);

      if (!res) {
        this.add(`ls: cannot access '${target}': No such file or directory`, "is-err");
        return;
      }
      if (typeof res.node === "string") {
        this.add(target);
        return;
      }

      const names = Object.keys(res.node)
        .filter((n) => showHidden || !n.startsWith("."))
        .sort((a, b) => {
          const da = typeof res.node[a] === "object";
          const db = typeof res.node[b] === "object";
          if (da !== db) return da ? -1 : 1;
          return a.localeCompare(b);
        });

      if (!names.length) return;

      const parts = [];
      names.forEach((n, i) => {
        const isDir = typeof res.node[n] === "object";
        parts.push({ text: isDir ? n + "/" : n, cls: isDir ? "is-dir" : "" });
        if (i < names.length - 1) parts.push({ text: "  ", cls: "" });
      });
      this.pushLine({ parts });
    },

    cmdCd(target) {
      if (!target) {
        this.cwd = [];
        return;
      }
      const res = this.resolve(target);
      if (!res) {
        this.add(`cd: no such file or directory: ${target}`, "is-err");
      } else if (typeof res.node === "string") {
        this.add(`cd: not a directory: ${target}`, "is-err");
      } else {
        this.cwd = res.parts;
      }
    },

    cmdCat(target) {
      if (!target) {
        this.add("cat: missing file name", "is-err");
        return;
      }
      const res = this.resolve(target);
      if (!res) {
        this.add(`cat: ${target}: No such file or directory`, "is-err");
      } else if (typeof res.node === "object") {
        this.add(`cat: ${target}: Is a directory`, "is-err");
      } else {
        this.addMany(res.node);
      }
    },

    /* ── Command history (↑ / ↓) ── */
    historyPrev() {
      if (!this.cmdHistory.length) return;
      if (this.histIndex === -1) {
        this.draft = this.input;
        this.histIndex = this.cmdHistory.length - 1;
      } else if (this.histIndex > 0) {
        this.histIndex--;
      }
      this.input = this.cmdHistory[this.histIndex];
    },

    historyNext() {
      if (this.histIndex === -1) return;
      if (this.histIndex < this.cmdHistory.length - 1) {
        this.histIndex++;
        this.input = this.cmdHistory[this.histIndex];
      } else {
        this.histIndex = -1;
        this.input = this.draft;
      }
    },

    /* ── Tab completion ── */
    autocomplete() {
      const tokens = this.input.split(/\s+/);
      const last = tokens[tokens.length - 1];
      let candidates = [];

      if (tokens.length === 1) {
        candidates = COMMANDS.filter((c) => c.startsWith(last));
      } else {
        const slash = last.lastIndexOf("/");
        const dirPart = slash >= 0 ? last.slice(0, slash + 1) : "";
        const namePart = last.slice(slash + 1);
        const res = this.resolve(dirPart || ".");
        if (!res || typeof res.node !== "object") return;

        candidates = Object.keys(res.node)
          .filter(
            (n) =>
              n.startsWith(namePart) &&
              (namePart.startsWith(".") || !n.startsWith("."))
          )
          .map((n) => dirPart + n + (typeof res.node[n] === "object" ? "/" : ""));
      }

      if (candidates.length === 1) {
        tokens[tokens.length - 1] = candidates[0];
        this.input = tokens.join(" ") + (tokens.length === 1 ? " " : "");
      } else if (candidates.length > 1) {
        this.pushLine({ input: true, cwd: this.cwdLabel, text: this.input });
        this.add(candidates.join("  "));
        this.scrollToBottom();
      }
    },
  },
};
</script>

<style scoped>
/*
  The parent's .content-modal has pointer-events: none so the desktop
  stays clickable. The terminal turns pointer events back on for itself
  only. There is no backdrop, blur, or overlay.
*/
.term {
  --t-bg: #151821;
  --t-bar: #1c202d;
  --t-border: #2a2f42;
  --t-fg: #d6dae6;
  --t-muted: #6f768f;
  --t-accent: #7fd1b9;
  --t-dir: #7aa2f7;
  --t-err: #f7768e;

  pointer-events: auto;
  width: min(780px, calc(100% - 32px));
  /* leaves room for the top bar and the launcher dock */
  height: min(520px, calc(100% - 190px));
  display: flex;
  flex-direction: column;
  background: var(--t-bg);
  color: var(--t-fg);
  border: 1px solid var(--t-border);
  border-radius: 12px;
  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  text-align: left;
  font-family: "JetBrains Mono", "Fira Code", ui-monospace, SFMono-Regular,
    Menlo, Consolas, "Liberation Mono", monospace;
  font-size: 14px;
  animation: term-in 0.18s ease-out both;
}

@keyframes term-in {
  from { transform: translateY(10px) scale(0.98); }
  to   { transform: none; }
}

/* ── Title bar ── */
.term-bar {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px 8px 14px;
  background: var(--t-bar);
  border-bottom: 1px solid var(--t-border);
}

.dot {
  flex-shrink: 0;
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.dot-close { background: #ff5f57; }
.dot-min   { background: #febc2e; }
.dot-max   { background: #28c840; }

.term-title {
  flex: 1;
  min-width: 0;
  margin-right: 24px; /* offsets the dots vs. X button width so the title looks centered */
  text-align: center;
  font-size: 12px;
  color: var(--t-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.close-btn {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  padding: 0;
  background: transparent;
  border: 0;
  border-radius: 6px;
  color: var(--t-muted);
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}

.close-btn:hover {
  background: rgba(247, 118, 142, 0.16);
  color: var(--t-err);
}

.close-btn:focus-visible {
  outline: 2px solid var(--t-accent);
  outline-offset: 1px;
}

/* ── Body ── */
.term-body {
  flex: 1;
  min-height: 0;
  padding: 14px 16px 18px;
  overflow-y: auto;
  overscroll-behavior: contain;
  line-height: 1.55;
  word-break: break-word;
  cursor: text;
  scrollbar-width: thin;
  scrollbar-color: #2c3145 transparent;
}

.line {
  min-height: 1.55em;
}

.prompt {
  margin-right: 8px;
  color: var(--t-accent);
  font-weight: 600;
  white-space: nowrap;
}

.echo-text,
.out-part {
  white-space: pre-wrap;
}

.is-accent { color: var(--t-accent); }
.is-muted  { color: var(--t-muted); }
.is-err    { color: var(--t-err); }
.is-dir    { color: var(--t-dir); font-weight: 600; }

/* ── Input ── */
.input-line {
  display: flex;
  align-items: baseline;
}

.term-input {
  flex: 1;
  min-width: 0;
  padding: 0;
  margin: 0;
  background: transparent;
  border: 0;
  outline: 0;
  color: inherit;
  font: inherit;
  caret-color: var(--t-accent);
}

.term ::selection {
  background: rgba(127, 209, 185, 0.28);
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .term {
    align-self: flex-start;
    margin-top: 56px; /* clears the top bar */
    width: calc(100% - 20px);
    height: 60vh;
    height: min(60dvh, 440px); /* keeps clear of the dock and the on-screen keyboard */
    border-radius: 10px;
    /* 16px stops iOS Safari from zooming in when the input is focused */
    font-size: 16px;
  }

  .term-body {
    padding: 12px;
  }

  .close-btn {
    width: 36px;
    height: 36px;
  }

  .term-title {
    margin-right: 12px;
  }

  /* shorter prompt on small screens: "~$" instead of "guest@portfolio:~$" */
  .prompt-user {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .term {
    animation: none;
  }
}
</style>