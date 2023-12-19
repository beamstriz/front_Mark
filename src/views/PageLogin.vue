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


        <form class="entrar" action="#">
          <h2>MARK</h2>
          <div>Para continuar, faça o seu login</div>
          <input type="email" placeholder="Email" />

          <div style="position: relative;">
            <input type="password" id="senha" placeholder="Senha" />
            <span id="mostrarSenha" onclick="mostrarOcultarSenha()">
              <i class="fas" :class="showPassword ? 'fa-eye-slash' : 'fa-eye'"></i>
            </span>
          </div>
          

          <a href="#">Esqueceu a senha?</a>

          <button>Entrar</button>
        </form>

      </div>
    </article>

  </template>

<script>
export default {
  data () {
    return {
      showPassword: false,
      username: "",
      password: "",
      showPassword: false,
      valid: true,
      sliDe: false,
      nameRules: [(v) => !!v || "Digite o Nome!"],
      passwordRules: [
        (v) => !!v || "Digite a Senha!",
        (v) => (v && v.length >= 6) || "Senha com menos de 6 caracteres!",
      ],
      loading: false,
    };
  },
    methods: {
      mostrarOcultarSenha() {
        this.showPassword = !this.showPassword;
      },
      try {
          this.loading = true;
        // eslint-disable-next-line no-undef
          await login(body);
          this.loading = false;
          this.valid = true;
          this.$router.push({ name: "sapienslogin" });
          window.location.reload();
        } catch (error) {
          this.loading = false;
          let message = await error.message;
          this.valid = false;
          this.$alert(message, "Error", "error", {
          confirmButtonText: "Got it!",
        });
      }
    }
  }
}

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
        opacity: 0;
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
  
