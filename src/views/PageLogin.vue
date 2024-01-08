<template>
    <article>
      <div class="wrapper" :class="{'slide-entrar-cadastrar' : sliDe}">
        <div class="overlay-wrapper">
          <div class="overlay">
            <div class="overlay-esquerdo">
              <h2>Já tem uma conta?</h2>
              <button class="inverter" id="entrar" @click="sliDe = !sliDe">Entrar</button>
            </div>
            <div class="overlay-direito">
              <h2>Novo por aqui?</h2>
              <button class="inverter" id="cadastrar-se" @click="sliDe = !sliDe">Cadastrar-se</button>
            </div>
          </div>
        </div>

        
        <form class="cadastrar-se" action="#">
          <h2>MARK</h2>
          <div>Preecha com seus dados </div>
          <input type="text" placeholder="Nome" />
          <input type="email" placeholder="Email" />
          <input type="senha" placeholder="Senha" />
          <button>Cadastrar-se</button>
        </form>


        <form class="entrar" @submit.prevent=loginUsuario>
          <h2>MARK</h2>
          <div>Para continuar, faça o seu login</div>
          <input type="email" v-model="email" placeholder="Email" />
          <input type="senha" v-model="senha" placeholder="Senha" />
        
          <a href="#">Esqueceu a senha?</a>

          <button type="submit">Entrar</button>
        </form>

      </div>
    </article>
</template>

<script>
//import { login } from "@/api/controleUsuario/login"

export default {
  data() {
    return {
      name: "PageLogin",
      email: '',
      senha: '',
      permitirLogin: true,
    };
  },
  methods: {
    async loginUsuario() {
      // try {
      //   const response = await login ({
      //     email: this.email,
      //     senha: this.senha,
      //   });

        // console.log(response)

        console.log("Método (loginUsuarioMark) chamado com sucesso")

        this.$router.push({ name: 'PageLoginSapiens' });
      // } catch (error) {
      //   console.error('erro no login', error.message)
      // }
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
      
      .overlay-wrapper {
        position: absolute;
        top: 0;
        left: 50%;
        width: 50%;
        height: 100%;
        overflow: hidden;
        transition: transform .5s ease-in-out;
        z-index: 100;
      }
      .overlay {
        position: relative;
        left: -100%;
        height: 100%;
        width: 200%;
        background: #8B0000;
        color: #fff;
        transform: translateX(0);
        transition: transform .5s ease-in-out;
      }
  
    /* @mixin include sobre os overlays esquerdo e direito */
  
      @mixin overlays($property) {
        position: absolute;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: space-around;
        flex-direction: column;
        padding: 70px 40px;
        width: calc(50% - 80px);
        height: calc(100% - 140px);
        text-align: center;
        transform: translateX($property);
        transition: transform .5s ease-in-out;
      }
      .overlay-esquerdo {
        @include overlays(-20%);
      }
      .overlay-direito {
        @include overlays(0);
        right: 0;
      }
    }
    h2 {
      margin: 0;
    }
    p {
      margin: 20px 0 30px;
    }
    a {
      color: #222;
      text-decoration: none;
      margin: 15px 0;
      font-size: 1rem;
    }
    button {
      border-radius: 20px;
      border: 1px solid #fff;
      background-color: transparent;    
      color: #fff;
      font-size: 1rem;
      font-weight: bold;
      padding: 10px 40px;
      letter-spacing: 1px;
      text-transform: uppercase;
      cursor: pointer;
      transition: transform .1s ease-in;
      &:active {
        transform: scale(.9);
      }
      &:focus {
        outline: none;
      }
    }
    button.inverter {
      background-color: transparent;
      border-color: #fff;
      
    }
    form {
      position: absolute;
      top: 0;
      display: flex;
      align-items: center;
      justify-content: space-around;
      flex-direction: column;
      padding: 90px 60px;
      width: calc(50% - 120px);
      height: calc(100% - 180px);
      text-align: center;
      background: linear-gradient(to bottom, #FFD700, #8B0000);
      transition: all .5s ease-in-out;
      div {
        font-size: 1rem;
      }
      input {
        background-color: #eee;
        border: none;
        padding: 8px 15px;
        margin: 6px 0;
        width: calc(100% - 30px);
        border-radius: 15px;
        border-bottom: 1px solid #ddd;
       /* efeito transição de cor sobre os campos do formulário*/
        overflow: hidden;
        &:focus {
          outline: none;
          background-color: #fff;
        }
      }
    }
    .entrar {
      left: 0;
      z-index: 2;
    }
    .cadastrar-se {
      left: 0;
      z-index: 1;
      opacity: 0;
    }
    .slide-entrar-cadastrar {
      .entrar {
        transform: translateX(100%);
      }
      .cadastrar-se {
        transform: translateX(100%);
        opacity: 1;
        z-index: 5;
        animation: show .5s;
      }
      .overlay-wrapper {
        transform: translateX(-100%);
      }
      .overlay {
        transform: translateX(50%);
      }
      .overlay-esquerdo {
        transform: translateX(0);
      }
      .overlay-direito {
        transform: translateX(20%);
      }
    }
    @keyframes show {
      0% {
        
        z-index: 1;
      }
      49% {
        opacity: 0;
        z-index: 1;
      }
      50% {
        opacity: 1;
        z-index: 10;
      }
    }
  </style>
  
