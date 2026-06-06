<template>
    <!-- <div class="file-card" @click="$emit('goto_stacked', 'projects')">
        <img src="../../images/folder.png" style="width: 50px; height: 50px;">

        <label>Projects</label>
    </div> -->

    <!-- <div class="file-card">
        <img src="../../images/pdf.png" style="width: 50px; height: 50px;">

        <label>Resume.pdf</label>
    </div> -->

    <div class="file-card" @click="$emit('viewImage', profilePic)">
        <img src="../../images/profile-pic.png" style="width: 50px; height: 50px;">

        <label>Profile-pic.png</label>
    </div>
    <div class="file-card" @click="$emit('viewImage', csucc)">
        <img src="../../images/csucc.png" style="width: 50px; height: 50px;">

        <label>csucc.png</label>
    </div>

    <div class="file-card" @click="$emit('goto_stacked', 'icons')">
        <img src="../../images/folder.png" style="width: 50px; height: 50px;">

        <label>Icons</label>
    </div>

    <div class="file-card" @click="$emit('goto_stacked', 'my life so far')">
        <img src="../../images/folder.png" style="width: 50px; height: 50px;">

        <label>Certificates</label>
    </div>
</template>

<script>
import ProfilePic from '../../images/profile-pic.png';
import Csucc from '../../images/csucc.png';
export default {
    data() {
        return {
            profilePic: ProfilePic,
            csucc: Csucc
        }
    }
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