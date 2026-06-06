<template>

    <div class="file-card" @click="viewText()">
        <img src="../../images/txt.png" style="width: 50px; height: 50px;">

        <label>college.txt</label>
    </div>


    <div class="file-card" @click="$emit('viewImage', meAndMom1)">
        <img src="../../images/1.jpg" style="width: 50px; height: 50px;">

        <label>me&mom (1).png</label>
    </div>
    <div class="file-card" @click="$emit('viewImage', meAndMom2)">
        <img src="../../images/2.jpg" style="width: 50px; height: 50px;">

        <label>me&mom (2).png</label>
    </div>
    <div class="file-card" @click="$emit('viewImage', withFriends)">
        <img src="../../images/3.jpg" style="width: 50px; height: 50px;">

        <label>with_friends<br>capstone.png</label>
    </div>
</template>

<script>
import MeAndMom1 from '../../images/1.jpg';
import MeAndMom2 from '../../images/2.jpg';
import WithFriends from '../../images/3.jpg';
export default {
    data() {
        return {
            meAndMom1: MeAndMom1,
            meAndMom2: MeAndMom2,
            withFriends: WithFriends
        }
    },
    methods: {
        viewText() {

            const content = `
        My College Life

        College has been one of the most memorable chapters of my life. It is a journey filled with challenges, growth, and unforgettable experiences. Throughout my years in college, I have learned not only academic knowledge but also important life skills such as responsibility, teamwork, communication, and time management.

        I met different people from various backgrounds who became my friends, classmates, and mentors. Working on projects, participating in activities, and overcoming difficult subjects helped me become more confident and prepared for the future.

        There were moments of stress during examinations and deadlines, but these challenges taught me perseverance and determination. Every success, whether big or small, became a reminder that hard work and dedication are worthwhile.

        College is more than earning a degree; it is about personal growth, building relationships, and discovering one's potential. As I continue my journey, I carry with me the lessons, memories, and experiences that will guide me in my future career and life.
        `;

            this.$emit('viewText', content, 'college.txt');
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