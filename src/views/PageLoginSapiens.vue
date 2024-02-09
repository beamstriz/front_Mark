<template>
    <article>
      <div class="wrapper">
        <form class="entrar" @submit.prevent="loginUsuarioSapiens">
          <h2>Login Super Sapiens</h2>
          <input type="text" v-model="username" placeholder="E-mail" />
          <input type="password" v-model="password" placeholder="Senha" />
          <button type="submit">Entrar</button>
        </form>
      </div>
    </article>
</template>

<script>
import { loginSapiens } from '@/api/mark_back/login/loginsSapiens';
import Swal from 'sweetalert2';

export default {
  name: "PageLoginSapiens",

  methods: {
    async loginUsuarioSapiens() {
        let data = {
         email: this.username,
         password: this.password,
        };

       try {
        console.log(data)
         const usuarioExiste = await loginSapiens(data);
        localStorage.setItem("sapiensEmail", data.email);
        localStorage.setItem("sapiensSenha", data.password);
        this.$router.push({ name: 'HomeView' });
        console.log(usuarioExiste)
         /* if (!usuarioExiste) {
           console.log("Usuário autenticado com sucesso");
           localStorage.setItem("sapiensEmail", data.username);
           localStorage.setItem("sapiensSenha", data.password);
           this.$router.push({ name: 'HomeView' });
         } else {
                 console.log("Usuário não existe ou credenciais inválidas");
         } */
       } catch (error) {
        Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Usuário Sapiens Incorreto",
      });
           console.error('erro no login', error.message)
       }
    },
  },
};

</script>

<style lang="scss" scoped>
  .wrapper {
    position: relative;
    width: 768px;
    height: 480px;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 10px 20px whitesmoke, 0 10px 10px black;
    background: linear-gradient(to bottom, #CFD8DC, white);

    form.entrar {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      align-items: center;
      justify-content: space-around;
      flex-direction: column;
      padding: 20px;
      width: 60%;
      
      border-radius: 8px;
      

      h2 {
        margin: 0;
      }

      div {
        font-size: 1rem;
        margin-bottom: 10px;
      }

      input {
        background-color: #eee;
        border: none;
        padding: 8px 15px;
        margin: 6px 0;
        font-size: 1rem;
        width: 100%;
        border-radius: 15px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        &:focus {
          outline: none;
          background-color: #fff;
        }
      }

      a {
        color: #222;
        text-decoration: none;
        margin: 15px 0;
        font-size: 1rem;
      }

      button {
        border-radius: 20px;
        border: 1px solid white;
        background-color: #405992;
        color: #fff;
        font-size: 1rem;
        font-weight: bold;
        padding: 10px 20px;
        letter-spacing: 1px;
        text-transform: uppercase;
        cursor: pointer;
        transition: background-color 0.2s, transform 0.1s ease-in;

        &:hover {
          background-color: #546da8;
        }

        &:active {
          transform: scale(0.9);
        }

        &:focus {
          outline: none;
        }
      }
    }
  }
</style>