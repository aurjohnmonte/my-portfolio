<template>

    <div class="file-card">
        <img src="../../images/pdf.png" style="width: 50px; height: 50px;">

        <label>pdf.png</label>
    </div>
        <div class="file-card">
        <img src="../../images/communication.png" style="width: 50px; height: 50px;">

        <label>communication.png</label>
    </div>
    <div class="file-card">
        <img src="../../images/folder (2).png" style="width: 50px; height: 50px;">

        <label>folder (2).png</label>
    </div>
    <div class="file-card">
        <img src="../../images/html.png" style="width: 50px; height: 50px;">

        <label>html.png</label>
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