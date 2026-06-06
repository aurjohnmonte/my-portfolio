<template>
    <div class="main-modal">

        <teleport to="body" v-if="showViewer">
            <ImageViewer
                :image_src="imagePath"
                :visible="true"
                @close="showViewer = false"
            />
        </teleport>

        <teleport to="body" v-if="text.showTextViewer">
            <TextViewer
                :src="text.textSource"
                :filename="text.filename"
                :visible="true"
                @close="text.showTextViewer = false"
            /> 
        </teleport>

        <!-- TOP HEADER -->
        <header class="top-header">
            <div class="title-section">
                <span class="material-symbols-outlined folder-icon">
                    folder
                </span>

                <label>
                    File Explorer - {{ paths.at(-1) }}
                </label>
            </div>

            <div class="window-controls">
                <img
                    src="../images/maximize.png"
                    class="title-icon-img"
                >

                <img
                    src="../images/remove.png"
                    class="title-icon-img"
                    @click.stop="$emit('close')"
                >
            </div>
        </header>

        <!-- SEARCH BAR -->
        <div class="search-header">

            <div class="nav-btn">
                <span
                    class="material-symbols-outlined nav-icon"
                    :class="{ disabled: paths.length <= 1 }"
                    @click="goPrevious"
                >
                    chevron_left
                </span>

                <span
                    class="material-symbols-outlined nav-icon"
                    :class="{ disabled: history_paths.length === 0 }"
                    @click="goHistory"
                >
                    chevron_right
                </span>
            </div>

            <div class="search-box">
                <span class="material-symbols-outlined search-icon">
                    search
                </span>

                <input
                    type="text"
                    placeholder="search folders ..."
                    v-model="searchFolderName"
                >
            </div>
        </div>

        <!-- PATH -->
        <div class="path-header">

            <div class="places-label" style="padding: 14px 24px; border-right: 1px solid rgba(255, 255, 255, 0.06);">
                Places
            </div>

            <div class="paths">
                <label
                    v-for="path in paths"
                    :key="path"
                >
                > {{ path }}
                </label>
            </div>

        </div>

        <!-- MAIN CONTENT -->
        <div class="main-content">

            <!-- SIDEBAR -->
            <aside class="sidebar">

                <div class="sidebar-item" @click="goTo('home')"
                     :class="{ active: $route.query.path === 'home' }">
                    <span class="material-symbols-outlined">
                        home
                    </span>

                    Home
                </div>

                <div class="sidebar-item" @click="goTo('documents')"
                    :class="{ active: $route.query.path === 'documents' }">
                    <span class="material-symbols-outlined">
                        description
                    </span>

                    Documents
                </div>

                <div class="sidebar-item">
                    <span class="material-symbols-outlined">
                        image
                    </span>

                    Images
                </div>

                <div class="sidebar-item">
                    <span class="material-symbols-outlined">
                        movie
                    </span>

                    Videos
                </div>

            </aside>

            <!-- FILE VIEW -->
            <section style="width: 100%;">

                <div class="file-view">
                    <Home  v-if="$route.query.path === 'home'"
                            @goto_stacked="goto_stacked"
                            @viewImage="viewImage"/>
                    <Documents v-if="$route.query.path === 'documents'"
                                @goto_stacked="goto_stacked"/>
                    <Projects  v-if="$route.query.path === 'projects'"
                                @goto_stacked="goto_stacked"/>
                    <Life_So_Far  v-if="$route.query.path === 'my life so far'"
                                @goto_stacked="goto_stacked"/>
                    <College  v-if="$route.query.path === 'college'"
                                @goto_stacked="goto_stacked"
                                @viewText="viewText"
                                @viewImage="viewImage"/>
                    <Icons  v-if="$route.query.path === 'icons'"
                                @goto_stacked="goto_stacked"/>
                        
                </div>

            </section>

        </div>

    </div>
</template>

<script lang="ts">
import Home from './file-explorer/Home.vue';
import Documents from './file-explorer/Documents.vue';
import Projects from './file-explorer/Projects.vue';
import Life_So_Far from './file-explorer/Life_So_Far.vue';
import College from './file-explorer/College.vue';
import Icons from './file-explorer/Icons.vue';
import ImageViewer from './modal/ImageViewer.vue';
import TextViewer from './modal/TextViewer.vue';

export default {
    components: {
        Home,
        Documents,
        Projects,
        Life_So_Far,
        College,
        Icons,
        ImageViewer,
        TextViewer,
    },
    methods: {
        viewText(source: string, filename: string) {
            this.text.textSource = source;
            this.text.filename = filename;
            this.text.showTextViewer = true;

        },
        viewImage(path: string) {
            console.log(path);
            this.imagePath = path;
            this.showViewer = true;
        },
        goPrevious() {
            if (this.paths.length <= 1) return;

            const current = this.paths.pop();

            if (current) {
                if(!this.history_paths.includes(current)) {
                    console.log("Did not exist");
                    this.history_paths.push(current);
                }
            }

            console.log(this.history_paths);

            const place = this.paths.at(-1);

            this.$router.push(`/file-explorer?path=${place}`);
        },
        goHistory() {

            if (this.history_paths.length === 0) return;
            
            const current = this.history_paths.pop();

            if(current) {
                this.paths.push(current);
            }

            this.$router.push(`/file-explorer?path=${current}`);
        },
        goTo(place: string) {

            console.log(place);
            this.$router.push(`/file-explorer?path=${place}`);
            this.paths = [];
            this.paths[0] = place;
        },
        goto_stacked(place: string) {
            try{

                this.history_paths = [];
                this.$router.push(`/file-explorer?path=${place}`);

                console.log(this.history_paths);

                this.paths.push(place);
            }
            catch(e) {
                console.log(e);
            }
        },
    },
    data() {
        return {
            searchFolderName: "",
            showViewer: false,
            text: {
                textSource: "",
                filename: "",
                showTextViewer: false,
            },
            imagePath: "/images/profile-pic.png",
            current_place: "home",
            paths: ["home"] as string[],
            history_paths: [] as string[],

        }
    },
    watch: {
        searchFolderName(newVal: string) {
            this.goTo(newVal);
        }
    }
}
</script>

<style scoped>

.nav-icon {
    padding: 6px;
    border-radius: 8px;
    cursor: pointer;
    transition: 0.2s;
}

.nav-icon:hover {
    background: rgba(255,255,255,0.08);
}

.nav-icon.disabled {
    opacity: 0.3;
    cursor: not-allowed;
    pointer-events: none;
}

.overlay {
    position: fixed;
    inset: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    background: rgba(0,0,0,0.45);
    backdrop-filter: blur(5px);

    z-index: 999;
}

.main-modal {
    pointer-events: all; /* add this */
    width: 900px;
    height: 620px;

    background: #2b2b2b;
    color: #f1f1f1;

    border-radius: 12px;
    overflow: hidden;

    border: 1px solid #3a3a3a;
}

/* HEADER */

.top-header {
    height: 42px;

    background: #3a3a3a;

    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 0 14px;

    font-size: 14px;
}


.title-section {
    display: flex;
    align-items: center;
    gap: 12px;

    font-size: 16px;
    font-weight: 600;
}

.folder-icon {
    color: #8b5cf6;
}

.window-controls {
    display: flex;
    align-items: center;
    gap: 18px;
}

.title-icon-img {
    width: 16px;
    height: 16px;
    cursor: pointer;
    opacity: 0.7;
    transition: 0.2s;
}

.title-icon-img:hover {
    opacity: 1;
    transform: scale(1.05);
}

/* SEARCH */

.search-header {
    height: 50px;

    background: #313131;

    display: flex;
    align-items: center;

    padding: 0 14px;

    gap: 12px;

    border-bottom: 1px solid #444;
}

.nav-btn {
    display: flex;
    align-items: center;
    gap: 10px;

    cursor: pointer;
}

.nav-btn span {
    padding: 6px;
    border-radius: 10px;
    transition: 0.2s;
}

.nav-btn span:hover {
    background: rgba(255,255,255,0.08);
}

.search-box {
    flex: 1;

    display: flex;
    align-items: center;

    background: #1f1f1f;

    border: 1px solid #4a4a4a;

    border-radius: 6px;

    padding: 8px 12px;
}

.search-box input {
    background: transparent;
    border: none;
    outline: none;

    color: white;
    width: 100%;
}

.search-box input::placeholder {
    color: rgba(255,255,255,0.45);
}

.search-icon {
    color: rgba(255,255,255,0.6);
}

/* PATH */

.path-header {
    display: flex;
    align-items: center;

    gap: 20px;

    font-size: 14px;

    border-bottom: 1px solid rgba(255,255,255,0.06);
}

.places-label {
    color: rgba(255,255,255,0.45);
    width: 60px;
}

.paths {
    display: flex;
    gap: 10px;
}

/* MAIN CONTENT */

.main-content {
    display: flex;
    height: calc(100% - 100px);
}

/* SIDEBAR */

.sidebar {
    width: 220px;

    background: #252525;

    border-right: 1px solid #3a3a3a;

    display: flex;
    flex-direction: column;
    height: 100%;
}

.sidebar-item {
    height: 40px;

    display: flex;
    align-items: center;

    gap: 12px;

    padding: 0 16px;

    cursor: pointer;

    font-size: 14px;
}

.sidebar-item:hover {
    background: #3a3a3a;
}

.sidebar-item.active {
    background: #4b4b4b;
}

/* FILE VIEW */

.file-view {
    flex: 1;

    background: #2b2b2b;

    padding: 14px;

    display: grid;

    grid-template-columns: repeat(auto-fill, 90px);

    gap: 18px;

    align-content: start;
}

.file-card {
    width: 90px;

    display: flex;
    flex-direction: column;

    align-items: center;

    gap: 6px;

    padding: 10px 4px;

    border-radius: 6px;

    cursor: pointer;
}

.file-card:hover {
    background: #3a3a3a;
}

.file-icon {
    font-size: 42px;
    color: #e5a50a;
}

.file-card label {
    font-size: 12px;
    text-align: center;
}

/* RESPONSIVE */

@media (max-width: 860px) {

    .main-modal {
        width: 95%;
        height: 90vh;
    }

    .sidebar {
        width: 80px;
    }

    .sidebar-item {
        justify-content: center;
    }

    .sidebar-item span:last-child {
        display: none;
    }
}

</style>