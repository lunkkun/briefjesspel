export default {
  data: function() {
    return {
      window: {
        height: window.innerHeight,
        width: window.innerWidth,
      },
    }
  },
  mounted: function() {
    window.addEventListener('resize', this.onResize)
  },
  beforeDestroy: function() {
    window.removeEventListener('resize', this.onResize);
  },
  computed: {
    landscape: function () {
      return this.window.width > this.window.height
    },
    portrait: function() {
      return !this.landscape
    },
  },
  methods: {
    onResize: function () {
      this.window.height = window.innerHeight
      this.window.width = window.innerWidth
    },
  },
}
