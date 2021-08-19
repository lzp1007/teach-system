export default function(defaultVaule = null) {
  return {
    data() {
      return {
        isLoading: true,
        data: defaultVaule
      }
    },
    async created() {
      this.data = await this.fetchData();
      this.isLoading = false;
    }
  }
}
