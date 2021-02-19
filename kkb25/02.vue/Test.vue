

<script>
export default {
  name: "test",
  data() {
    return {
      list: ["A", "B", "C", "D"],
      seconds:'',
      minute:'',
      hours:''
    };
  },
  methods: {
    handleClick() {
      console.log(1)
    },
  },
  mounted() {
    this.timer = setInterval(() => {
      const date = new Date()
      this.seconds = date.getSeconds()
      this.minute = date.getMinutes()
      this.hours = date.getHours()
    }, 100)
  },
  computed:{
    computedSecond() {
      return this.seconds.toString().length === 1 ? '0' + this.seconds.toString() : this.seconds
    }
  },
  render() {
    return (
      <div id="app" class="test">
        <h1>Hello World</h1>
        <h2>{this.hours} : {this.minute} : {this.computedSecond}</h2>
        <button onClick={this.handleClick}>点我</button>
      </div>
    );
  },
};
</script>

<style>
</style>