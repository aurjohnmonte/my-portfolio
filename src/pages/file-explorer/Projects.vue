<template>
    <div class="file-card" @click="$emit('goto_stacked', 'AI Driven Survey System (system-folder)')">
        <img src="../../images/folder.png" style="width: 50px; height: 50px;">

        <label>AI Driven Survey System (system-folder)</label>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
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

</style>