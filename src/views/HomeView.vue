<template>
  <v-app>
    <v-navigation-drawer v-model="Menuaberto">
      <v-list>
        <v-list-subheader>Menu</v-list-subheader>
          <v-list-item prepend-icon="mdi-home">Home</v-list-item>
      </v-list>
    </v-navigation-drawer>
    <br>
    
    <!-- CABEÇALHO -->
    <v-app-bar flat class="border-b" @click="Menuaberto = !Menuaberto" color="#F5F5F5">
      <v-app-bar-nav-icon color="gray"></v-app-bar-nav-icon>
      <v-app-bar-title><img src="@/assets/logo-agu.png" width="110px" height="77px" style="display: block; margin: auto;"/></v-app-bar-title>

      <template #append>
        <v-btn icon @click="sair">
            <v-icon icon="mdi-logout" color="red" ></v-icon>
        </v-btn>
      </template>
    </v-app-bar>

    <!-- DASHBOARD -->
    <v-main style="background-color: #fafafa">
      <v-container>
        <h3>Olá, usuário!</h3>
        <v-card title="Fichas Salvas" class="first-Card"></v-card>
        <v-card title="Gerar pesquisa" class="first-Card" style="margin-top: 10px;">
          <v-icon 
            color="blue" 
            icon="mdi-plus" 
            size="x-small" 
            id="btn-plus" 
            @click="gerarNovoCard"
          ></v-icon>
          <v-tooltip activator="#btn-plus">
            Clique aqui para gerar nova pesquisa.
          </v-tooltip>
        </v-card>

              <!-- RENDERIZAR FICHAS ADICIONADAS DINAMICAMENTE -->
          <div v-for="(card, index) in cards" :key="index">
            <v-card style="margin-top: 15px;">
            <div class="title-card">
              <div class="title-container">
                <span class="card-title"> {{ cardTitle }}</span>
                <div class="funcaoCard-order">
                  <div class="funcaoCard">
                    <v-icon icon="mdi-pencil" @click="renomearCard" size="20px"></v-icon>
                  </div>
                  <div class="funcaoCard">
                    <v-icon icon="mdi-content-save" @click="salvarDados" color="rgb(111, 157, 217)" size="20px"></v-icon>
                  </div>
                </div>
              </div>
                <div class="funcaoCard">
                  <v-icon icon="mdi-minus" @click="apagarCard(index)" color="red" size="x-small" id="btn-plus"></v-icon>
                </div>
            </div>
            <v-divider></v-divider>
            <div style="padding: 30px 30px 0px 30px;">
              <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-sheet width="100%">
                  <v-form @submit.prevent>
                    <v-text-field
                      v-model="relatorioPesquisa"
                      :rules="itemRules"
                      label="Movimentação"
                      @input="transformarParaMaiuscula"
                    ></v-text-field>
                  </v-form>
                </v-sheet>
              
                <v-sheet width="100%">
                  <v-form @submit.prevent>
                    <v-text-field
                      v-model="conteudoPesquisa"
                      :rules="itemRules"
                      label="Conteúdo de pesquisa"
                      @input="transformarParaMaiuscula"
                    ></v-text-field>
                  </v-form>
                </v-sheet>
              </v-col>

              <v-col cols="12" sm="6" md="4">
                <v-sheet width="100%">
                  <v-form @submit.prevent>
                    <v-text-field
                      v-model="observacaoPesquisa"
                      :rules="itemRules"
                      label="Observação"
                      @input="transformarParaMaiuscula"
                    ></v-text-field>
                  </v-form>
                </v-sheet>

                <v-sheet width="100%">
                  <v-form @submit.prevent>
                    <v-text-field
                      v-model="novaObservacao"
                      :rules="itemRules"
                      label="Nova Observação"
                      @input="transformarParaMaiuscula"
                    ></v-text-field>
                  </v-form>
                </v-sheet>
              </v-col>

              <v-col cols="12" sm="6" md="4">
                <v-text-field cols="3" label="Data" type="date"></v-text-field>
                <v-sheet width="100%">
                  <v-form @submit.prevent>
                    <v-text-field
                      v-model="tituloPesquisa"
                      :rules="[]"
                      label="Palavra de Busca"
                      @input="transformarParaMaiuscula"
                    ></v-text-field>
                  </v-form>
                </v-sheet>
              </v-col>
            </v-row>
            </div>
            <div class="radios">
              <v-radio-group label="Tipo da Observação:" v-model="checkboxTipoObservacao">
                  <v-radio label="Administrativo" value="ADMINISTRATIVO"  ></v-radio>
                  <v-radio label="Judicial" value="JUDICIAL" ></v-radio>
              </v-radio-group>
            </div>
          </v-card>
          </div>
          <div>
              
              <progress-loader :exibirProgresso="mostrarProgresso"></progress-loader>
             
          </div>

        <!-- BOTÕES DE AÇÃO  -->
            <div >
              <div class="botoesacoes">
                <v-btn prepend-icon="mdi-play" style="background-color: rgb(157, 247, 115);" @click="enviarDadosPesquisa">
                  Iniciar
                </v-btn>

                <v-btn prepend-icon="mdi-delete" style="background-color: rgb(241, 230, 106); margin-left:50px" @click="limparInputs">
                  Limpar
                </v-btn>
              </div>
            </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { axios_controle_usuario } from '@/api/visao/Api_axios_visao';
import { getPageMark } from '../api/mark_back/getPageMark/getPage';
import { postSaveDados } from '../api/mark_back/postSaveDadosMark/postSaveDados';
import Swal from 'sweetalert2';
import { getProcesso } from '../api/mark_back/getProcessosMark/getProcesso';
import ProgressLoader from '@/components/ProgressLoader.vue';


export default {
  components: {
    ProgressLoader
  },
  data() {
    return {
      Menuaberto: false,
      valid: false,
      termoPesquisa:'',
      dialogm1: '',
      dialog: false,
      cards: [],
      nomeUsuario: '',
      tituloPesquisa: '',
      conteudoPesquisa: '',
      relatorioPesquisa: '',
      observacaoPesquisa:'',
      novaObservacao: '',
      checkboxTipoObservacao: "ADMINISTRATIVO",
      checkboxJud: false,
      mostrarProgresso: false,
      cardTitle: "Título card",
      itemRules: [
        value => {
          if (value) return true
          return 'Campo obrigatório!'
        }
      ],
    }
  },
  methods: {
    async salvarDados(){
      Swal.fire({
        title: "Você deseja salvar alterações?",
        showDenyButton: true,
        confirmButtonText: "Salvar",
        denyButtonText: `Cancelar`
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Salvo com sucesso!", "", "success");
        } else if (result.isDenied) {
          Swal.fire("Alterações não foram salvas", "", "info");
        }
      });
      
      const dados = {
        relatorioPesquisa: this.relatorioPesquisa,
        conteudoPesquisa: this.conteudoPesquisa,
        observacaoPesquisa: this.observacaoPesquisa,
        novaObservacao: this.novaObservacao,
        data: this.data,
        tituloPesquisa: this.tituloPesquisa,
        checkboxTipoObservacao: this.checkboxTipoObservacao,
      };

      try {
        const response = await postSaveDados(dados)
        console.log('Dados enviados com sucesso!', response)
      } catch(error) {
        console.error("Erro no envio dos dados:", error);
      }
    },

    renomearCard() {
      Swal.fire({
        title: "Renomear Card",
        input: "text",
        inputAttributes: {
          autocapitalize: "off"
        },
        showDenyButton: true,
        denyButtonText: `Cancelar`,
        confirmButtonText: "Salvar",
        preConfirm: (novoNome) => {
          if (novoNome.trim() === "") {
            Swal.showValidationMessage("Por favor, insira um nome válido.");
          }
        }
      }).then((result) => {
        if (result.isConfirmed) {
          this.cardTitle = result.value;
          Swal.fire({
            icon: "success",
            title: "Salvo com sucesso!",
            showConfirmButton: false,
            timer: 1500
          });
        }
      });
    },


    sair(){
      localStorage.clear();
      this.$router.push({ name: 'PageLogin' });
    },

    gerarNovoCard() {
      this.cards.push({
        tituloPesquisa: '',
        observacao: ''
      })
    },

    limparInputs() {     
      this.observacaoPesquisa = ""
      this.relatorioPesquisa = ""
      this.conteudoPesquisa = ""
      this.tituloPesquisa = ""
      this.novaObservacao = ""
    },

    apagarCard(index) {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Você tem certeza?",
      text: "Você não será capaz de recuperar dados!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, deletar!",
      cancelButtonText: "Não, cancelar!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire({
          title: "Deletado!",
          text: "Deletado com sucesso.",
          icon: "success",
        });
        this.cards.splice(index, 1);
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelado",
          text: "Seus dados estão salvos :)",
          icon: "error"
        });
      }
    });
    },

    transformarParaMaiuscula() {
      this.tituloPesquisa = this.tituloPesquisa.toUpperCase();
      this.conteudoPesquisa = this.conteudoPesquisa.toUpperCase();
      this.relatorioPesquisa = this.relatorioPesquisa.toUpperCase();
      this.observacaoPesquisa = this.observacaoPesquisa.toUpperCase();
      this.novaObservacao = this.novaObservacao.toUpperCase();
    },

    async enviarDadosPesquisa() {
      try{

          console.log('StringBusca:', this.tituloPesquisa);
          console.log('Movimentação:', this.relatorioPesquisa);
          console.log('conteudo da pesquisa:', this.conteudoPesquisa);
          console.log('observaçãoSapiens:', this.observacaoPesquisa);
          console.log('nova observação:', this.novaObservacao);
        
        if(this.observacaoPesquisa.length <= 0 || this.relatorioPesquisa.length <= 0 || this.conteudoPesquisa.length <= 0 || this.novaObservacao.length <= 0){
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Informe os dados para continuar",
          });
        } else if (this.tituloPesquisa.length > 0){
          const dados = {
            email: localStorage.getItem('sapiensEmail'),
            password: localStorage.getItem('sapiensSenha'),
            observacao_sapiens: this.observacaoPesquisa.trim(),
            movimentacao: [this.relatorioPesquisa],
            conteudo: [this.conteudoPesquisa],
            StringBusca: [this.tituloPesquisa],
            StringObservacao: [this.novaObservacao],
            timeCreationDocument: [null],
            idUser: localStorage.getItem("authToken"),
            typeSearch: this.checkboxTipoObservacao 
          };
          this.mostrarProgresso = true;
          const response = await getPageMark(dados)
          this.mostrarProgresso = false;
          console.log(response)
        } else {
            console.log("oi")
            const dados = {
              email: localStorage.getItem('sapiensEmail'),
              password: localStorage.getItem('sapiensSenha'),
              observacao_sapiens: this.observacaoPesquisa,
              movimentacao: [this.relatorioPesquisa],
              conteudo: [this.conteudoPesquisa],
              StringObservacao: [this.novaObservacao],
              timeCreationDocument: [null],
              typeSearch: this.checkboxTipoObservacao 
            };
            console.log(dados)
            this.mostrarProgresso = true;
            const responseProcess = await getProcesso(dados)
            this.mostrarProgresso = false;
            console.log(responseProcess)
        }    
      }catch(e){
        Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "ERRO AO TRIAR",
      });
        this.mostrarProgresso = false;
        console.log(e)
      }
      
     
      //   console.log("Dados enviados com sucesso: ", response.data);
      // )};
      // catch((error) => {
      //   console.log("Erro ao enviar os dados: ", error);
      // }),
      // return response;
    }
  },
  mounted() {
    const token = localStorage.getItem("token");
    axios_controle_usuario.get("/get/user", {
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
    .then((res) => {
      this.nomeUsuario = res.data.name;
    })
    .catch((err) => {
      console.log("Erro ao obter as informações do usuario: ", err);
    });
  },

  observacaoPesquisaChange(event) {
    this.observacao = event.target.value;
  },
  
}

</script>

<style>

.first-Card {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.first-Card > .v-icon:hover {
  border-radius: 80%;
  background-color: rgb(242, 242, 242);
}

.first-Card .v-icon {
  position: absolute;
  right: 2%;
}

.title-card {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 12px 17px 5px 28px;
}

.title-container {
  display: flex;
  flex-direction: row;
  width: 50%;
}

.card-title {
  margin-right: 15px;
  font-size: 20px;
}

.transparent-button {
  box-shadow: none;
  height: 20px;
  width: auto;
}

.grey-hover:hover{
  background-color: #f0f0f0;
  box-shadow: none
}

.first-Part {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin:1% 0% 0% 0%;
}

.column {
  display: flex;
  flex-direction: column;
  align-items: space-around;
  border: solid 1px rebeccapurple;
  padding: 0px 25px 0px 25px;
}

.radios{
  padding: 0px 0px 0px 10px;
}

.input-date {
  display: flex;
  flex-direction: column;
}

.inputRelatorio {
  display: flex;
  flex-direction: row;
}

.tituloPesquisa {
  display: flex;
  flex-direction: row;
}

.observacao {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top:15px;
}

.funcaoCard-order{
  display:flex;
  flex-direction: row;
  width: 10%;
  justify-content: space-between;
}

.funcaoCard {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.funcaoCard:hover {
  border-radius: 30%;
  padding: 0.5px;
  background-color: rgb(242, 242, 242);
}

.botoesacoes{
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top:15px;
}

</style>

