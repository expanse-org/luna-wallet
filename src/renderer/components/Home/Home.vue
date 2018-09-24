<template>
  <div id="wrapper">
    <main>
      <div class="left-side">
        <span class="title">
          Home Page
        </span>
        <router-link class="alt" to="/" >Back To main</router-link >
          <!-- {{Counter}} -->
      </div>
    </main>
  </div>
</template>

<script>

  // import axios from 'axios';
  // import ky from 'ky';
  import { mapState } from 'vuex'
  export default {
    name: 'landing-page',
    created(){
      this.fetch();
    },
    // computed: {
    //   ...mapState({
    //     Counter: 'Counter' // fetch state.GameView into this.GameView
    //   })
    // },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      fetch(){
        var loginData = {
          limit: 10,
          skip: 0,
        }
        // const data=JSON.stringify(loginData);
        // const config = { headers: { "Content-Type": "application/json" } };

        // var url = 'https://beta-api.gander.tech/getallblocks';
        // (async () => {
        // 	const json = await ky.post(url, {json: loginData}).json();
        //
        // 	console.log(json);
        // 	//=> `{data: '🦄'}`
        // })();
        // axios.post(url, data, config )
        //   .then((response)  =>  {
        //     console.log(response)
        //   if(response.data.success){
        //     console.log(response.data.message)
        //   }else
        //   {
        //
        //   }
        // })
      }
    }
  }
</script>

<style>

</style>
