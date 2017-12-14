<template>
  <div>
    <h1>상세 내용</h1>
    <div v-for="user in users" class="">
      {{user.name}}
      <div v-html="user.age" class="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created: function () {
    var id = this.$route.params.id
    this.$http.get(`/api/tests/${id}`)
    .then((response) => {
      this.users = response.data
    })
  },
  data: function () {
    return {
      users: []
    }
  }
}
</script>
