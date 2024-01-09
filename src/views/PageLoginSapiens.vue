<template>
    <article>
      <div class="wrapper">
        <form class="entrar" @submit.prevent="loginUsuarioSapiens">
          <h2>Login Sapiens</h2>
          <input type="cpf" v-model="cpf" placeholder="CPF" />
          <input type="senha" v-model="senha" placeholder="Senha" />
          <button type="submit">Entrar</button>
        </form>
      </div>
    </article>
</template>

<script>
import { VerificarUserSapiens } from '@/api/verificadorSapiens/user';

export default {
  name: "PageLoginSapiens",
  data: () => {
    return {
      cpf: "",
      senha: "",
    };
  },
  
  methods: {
    async loginUsuarioSapiens() {
        let body = {
         cpf: this.cpf,
         senha: this.senha,
        };
       this.$router.push({ name: 'HomeView' });


       try {
         console.log("Enviando requisição para verificar usuário")
         const usuarioExiste = await VerificarUserSapiens(body);
         console.log("Usuário existe?", usuarioExiste);


        
         if (usuarioExiste) {
           console.log("Usuário autenticado com sucesso");
           localStorage.setItem("sapiensCPF", body.cpf);
           localStorage.setItem("sapiensSenha", body.senha);
           this.$router.push({ name: 'HomeView' });
         } else {
                 console.log("Usuário não existe ou credenciais inválidas");
         }
       } catch (error) {
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
    box-shadow: 0 10px 20px #8B0000, 0 10px 10px #8B0000;
    background: linear-gradient(to bottom, #FFD700, #8B0000);

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
        background-color: transparent;
        color: #fff;
        font-size: 1rem;
        font-weight: bold;
        padding: 10px 20px;
        letter-spacing: 1px;
        text-transform: uppercase;
        cursor: pointer;
        transition: background-color 0.2s, transform 0.1s ease-in;

        &:hover {
          background-color: #8B0000;
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