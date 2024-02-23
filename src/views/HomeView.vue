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
        <v-card title="Gerar pesquisa"></v-card>
          
          <!-- INPUT DO TERMO DE PESQUISA -->
          <v-card style="margin-top: 15px;">
            <div class="title-card">
              <div class="title-container">
                <span class="card-title"> {{ cardTitle }}</span>
                <v-btn @click="renomearCard" class="transparent-button" :class="{ 'grey-hover' : isMouseOver }"><v-icon>mdi-pencil</v-icon></v-btn>
                <v-btn @click="salvarDados" class="transparent-button" :class="{ 'grey-hover' : isMouseOver }"><v-icon style="color: rgb(111, 157, 217);">mdi-content-save</v-icon></v-btn>
              </div>
            </div>
            <v-divider></v-divider>
            <div class="first-Part">
              <div class="column">
                <v-sheet width="330" class="mx-auto">
                  <v-form @submit.prevent>
                    <v-text-field
                      v-model="relatorioPesquisa"
                      :rules="rules"
                      label="Movimentação"
                      @input="transformarParaMaiuscula"
                    ></v-text-field>
                  </v-form>
                </v-sheet>

                <v-sheet width="330" class="mx-auto">
                  <v-form @submit.prevent>
                    <v-text-field
                      v-model="conteudoPesquisa"
                      :rules="rules"
                      label="Conteúdo de pesquisa"
                      @input="transformarParaMaiuscula"
                    ></v-text-field>
                  </v-form>
                </v-sheet>
              </div>
              <div class="column">
                <v-sheet width="330" class="mx-auto">
                  <v-form @submit.prevent>
                    <v-text-field
                      v-model="observacaoPesquisa"
                      :rules="rules"
                      label="Observação"
                      @input="transformarParaMaiuscula"
                    ></v-text-field>
                  </v-form>
                </v-sheet>

                <v-sheet width="330" class="mx-auto">
                  <v-form @submit.prevent>
                    <v-text-field
                      v-model="novaObservacao"
                      :rules="rules"
                      label="Nova Observação"
                      @input="transformarParaMaiuscula"
                    ></v-text-field>
                  </v-form>
                </v-sheet>
              </div>

              <div class="column">
                <div class="itemData">
                  <input type="date" v-model="data" placeholder="Data">
                </div>

                <v-sheet width="330" class="mx-auto">
                  <v-form @submit.prevent>
                    <v-text-field
                      v-model="tituloPesquisa"
                      :rules="itemRules"
                      label="Palavra de Busca"
                      @input="transformarParaMaiuscula"
                    ></v-text-field>
                  </v-form>
                </v-sheet>
              </div>
            </div>
            <div class="radios">
              <v-radio-group label="Tipo da Observação:" v-model="checkboxTipoObservacao">
                  <v-radio label="Administrativo" value="ADMINISTRATIVO"  ></v-radio>
                  <v-radio label="Judicial" value="JUDICIAL" ></v-radio>
              </v-radio-group>
            </div>
          </v-card>

              <!-- RENDERIZAR CARDS DINAMICAMENTE -->
          <div v-for="(card, index) in cards" :key="index">
            <v-card style="margin-top: 15px;">
              <div class="apagarCards">
                <v-icon color="red" icon="mdi-minus" size="x-small" id="btn-plus" @click="apagarCard(index)"></v-icon>
              </div>
              <div class="first-Part">
                <div class="column">
                  <v-sheet width="330" class="mx-auto">
                    <v-form @submit.prevent>
                      <v-text-field
                        v-model="relatorioPesquisa"
                        :rules="rules"
                        label="Movimentação"
                        @input="transformarParaMaiuscula"
                      ></v-text-field>
                    </v-form>
                  </v-sheet>

                  <v-sheet width="330" class="mx-auto">
                    <v-form @submit.prevent>
                      <v-text-field
                        v-model="conteudoPesquisa"
                        :rules="rules"
                        label="Conteúdo de pesquisa"
                        @input="transformarParaMaiuscula"
                      ></v-text-field>
                    </v-form>
                  </v-sheet>
                </div>
                <div class="column">
                  <v-sheet width="330" class="mx-auto">
                    <v-form @submit.prevent>
                      <v-text-field
                        v-model="observacaoPesquisa"
                        :rules="rules"
                        label="Observação"
                        @input="transformarParaMaiuscula"
                      ></v-text-field>
                    </v-form>
                  </v-sheet>

                  <v-sheet width="330" class="mx-auto">
                    <v-form @submit.prevent>
                      <v-text-field
                        v-model="novaObservacao"
                        :rules="rules"
                        label="Nova Observação"
                        @input="transformarParaMaiuscula"
                      ></v-text-field>
                    </v-form>
                  </v-sheet>
                </div>

                <div class="column">
                  <div class="itemData">
                    <input type="date" v-model="data" placeholder="Data">
                  </div>

                  <v-sheet width="330" class="mx-auto">
                    <v-form @submit.prevent>
                      <v-text-field
                        v-model="tituloPesquisa"
                        :rules="itemRules"
                        label="String Busca"
                        @input="transformarParaMaiuscula"
                      ></v-text-field>
                    </v-form>
                  </v-sheet>
                </div>
              </div>
            </v-card>
          </div>

        <!-- BOTÕES DE AÇÃO  -->
            <div class="observacao">
              <div>
                <v-btn prepend-icon="mdi-play" style="background-color: rgb(157, 247, 115);" @click="enviarDadosPesquisa">
                  Iniciar
                </v-btn>

                <v-btn prepend-icon="mdi-delete" style="background-color: rgb(241, 230, 106); margin-left:50px" @click="limparInputs">
                  Limpar
                </v-btn>
              </div>
              
              <v-icon color="blue" icon="mdi-plus" size="x-small" id="btn-plus" @click="gerarNovoCard"></v-icon>
                <v-tooltip activator="#btn-plus">
                  Clique aqui para gerar nova pesquisa.
                </v-tooltip>
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

export default {
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
        showCancelButton: true,
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
      this.tituloPesquisa = ''
      for (let i = 0; i < this.cards.length; i++) {
        this.cards[i].tituloPesquisa = '';
      }
    },

    apagarCard(index) {
      this.cards.splice(index, 1);
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
        
        if (this.tituloPesquisa.length > 0){
          const dados = {
            email: localStorage.getItem('sapiensEmail'),
            password: localStorage.getItem('sapiensSenha'),
            observacao_sapiens: this.observacaoPesquisa,
            movimentacao: [this.relatorioPesquisa],
            conteudo: [this.conteudoPesquisa],
            StringBusca: [this.tituloPesquisa],
            StringObservacao: [this.novaObservacao],
            timeCreationDocument: [null],
            idUser: "8767",
            typeSearch: this.checkboxTipoObservacao 
          };
          console.log(dados)
          const response = await getPageMark(dados)
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
            const responseProcess = await getProcesso(dados)
            console.log(responseProcess)
        }    
      }catch(e){
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
  
  padding: 0px 25px 0px 25px;
}

.radios{
  padding: 0px 0px 0px 10px;
}

.input-date {
  display: flex;
  flex-direction: column;
}

.itemData {
  margin-right: 50px;
  font-size: 0.95em;
  margin: 10px 13px 28px 70px;
  color: gray
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

.apagarCards {
  display: flex;
  justify-content: end;
  padding-top: 5px;
}

</style>

