<template>
  <div class="users">
    <h1>사용자 목록</h1>
    <div v-for="user in users" class="user">
      <div>
        <strong>{{user.name}}</strong>
        <router-link :to="{ name: 'detail', params: { id: user.id }}">더보기</router-link>
      </div>
    </div>
    <router-link v-bind:to="{ name: 'SignUp'}">작성하기</router-link>
  </div>
</template>

<script>
export default{
  created() {
    this.$http.get('/api/tests')
    .then((response) => {
      this.users= response.data
    })
  },
  data() {
    return {
      users: []
    }
  }
}
</script>
