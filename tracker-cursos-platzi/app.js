var app = new Vue({
  el: '#app',

  data () {
    return {
      courses: [{
          title: 'Curso básico de Vue',
          time: 2
        },
        {
          title:'Js Profesional',
          time: 3
        }
      ],
      title: '',
      time: 0
    }
  },

  computed: {
    totalTime() {
      return this.courses.reduce((result, ele) => ({
        time: result.time + ele.time
      })).time;
    }
  },

  methods: {
    addCourse () {
    this.courses.push({
      title: this.title,
      time: Number(this.time)
    })
    }
  }
})