<template>
  <div id="SignUp">
    <div> Sign Up </div>
    name : <input v-model="user.name" placeholder="name"> <br />
    ID : <input v-model="user.id" placeholder="ID"> <br />
    AGE : <textarea v-model="user.age" placeholder="여러줄을 력해보세요"></textarea>
    <button v-on:click="signUp">SignUp</button>
  </div>
</template>

<script>
export default {
  data: function () {
      return {
        user: {
          id: '',
          name: '',
          age: ''

        }
      }
    },

    methods: {
      signUp: function (event) {
        this.$http.post('http://localhost:3000/api/tests', { //axios 사용
          user: this.user
        })
        .then((response) => {
          if (response.data.result === 0) {
            //alert('Error, please, try again')
            console.log('Error, please, try again');
          }
          if (response.data.result === 1) {
            //alert('Success')
            console.log('Success');
            this.$router.push('/api/tests') // Login 페이지로 보내줌
          }
        })
        .catch(function (error) {
          //alert('error')
          console.log('error');
        })
      }
    }
}
</script>
