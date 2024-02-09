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
            <div class="first-Part" style="border: solid firebrick;">
              <div class="column" style="border: solid hotpink;">
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

                  <div class="itemData">
                    <input type="date" v-model="data" class="inputDate" placeholder="Data">
                  </div>
                </div>

                <div class="column">
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
                </div>

                <div class="column">
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
              </div>
            </v-card>

              <!-- RENDERIZAR CARDS DINAMICAMENTE -->
              <div v-for="(card, index) in cards" :key="index">
                <v-card style="margin-top: 15px;">
                  <div class="first-Part">
              <div class="input-date">
                
                <div class="tituloPesquisa">
                  <v-sheet width="300">
                    <v-form @submit.prevent>
                      <v-text-field
                        v-model="tituloPesquisa"
                        :rules="itemRules"
                        label="Título de pesquisa"
                      ></v-text-field>
                    </v-form>
                  </v-sheet>
                  
                  <div class="itemData">
                    <input type="date" v-model="data" class="inputDate" placeholder="Data">
                  </div>
                </div>
                
                <div class="inputRelatorio">
                  <v-sheet width="300" class="mx-auto">
                    <v-form @submit.prevent>
                      <v-text-field
                        v-model="conteudoPesquisa"
                        :rules="rules"
                        label="Conteúdo"
                      ></v-text-field>
                    </v-form>
                  </v-sheet>

                  <v-sheet width="300" class="mx-auto">
                    <v-form @submit.prevent>
                      <v-text-field
                        v-model="relatorioPesquisa"
                        :rules="rules"
                        label="Movimentação"
                      ></v-text-field>
                    </v-form>
                  </v-sheet>
                  </div>
              </div>

                  <!-- SELECIONAR OBSERVAÇÃO -->
                  <!-- <v-autocomplete
                    v-model="observacaoPesquisa"
                    label="Selecionar Observação"
                   
                    style="margin: 16px 10px 0px 10px">
                  </v-autocomplete> -->
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

                <v-btn prepend-icon="mdi-close" style="background-color: rgb(241, 106, 106); margin-left:50px">
                  Parar
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
import { getPageMark } from '../api/mark_back/getPageMark/getPage'
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
      itemRules: [
        value => {
          if (value) return true
          return 'Campo obrigatório!'
        }
      ],
    }
  },
  methods: {
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

          console.log('título de pesquisa:', this.tituloPesquisa);
          console.log('relatório de pesquisa:', this.relatorioPesquisa);
          console.log('conteúdo de pesquisa:', this.conteudoPesquisa);
          console.log('observação:', this.observacaoPesquisa);
          console.log('nova observação:', this.novaObservacao);
        
        if (this.tituloPesquisa.length > 0){
          const dados = {
            email: localStorage.getItem('sapiensEmail'),
            password: localStorage.getItem('sapiensSenha'),
            observacao_sapiens: this.observacaoPesquisa,
            movimentacao: [this.relatorioPesquisa],
            conteudo: [this.conteudoPesquisa],
            StringBusca: [this.tituloPesquisa],
            stringObservacao: [this.novaObservacao],
            timeCreationDocument: [null],
            idUser: "8767"
          };
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
              StringObservacao: ["string para etiquetar quando encntrar"],
              timeCreationDocument: [null]
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
.first-Part {
  display: flex;
  flex-direction: column;
  margin: 10px 10px 10px 10px;
}

.input-date {
  display: flex;
  flex-direction: column;
}

.inputDate {
  margin-right: 50px;
  font-size: 0.95em;
  
}

.itemData {
  margin: 23px 13px 0px 10px;
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

