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
        <!-- AVATAR -->
        <v-avatar color="#BDBDBD">
        <v-img cover
          src="src/assets/logo-agu.jpg"
          alt="Foto do usuário"
        ></v-img>
        </v-avatar>

        <v-btn icon>
            <v-icon icon="mdi-logout" color="red"></v-icon>
        </v-btn>
      </template>
    </v-app-bar>

    <!-- DASHBOARD -->
    <v-main style="background-color: #fafafa">
      <v-container>
        <h3>Olá, {{ nomeUsuario }}!</h3>
        <v-card title="Gerar pesquisa"></v-card>
          

          <!-- INPUT DO TERMO DE PESQUISA -->
          <v-card style="margin-top: 15px;">
            <div class="first-Part">
              <div class="input-date">
                <v-form @submit.prevent>
                  <v-text-field
                    v-model="itemPesquisa"
                    :rules="itemRules"
                    label="Item de Pesquisa"
                    style="margin: 16px 10px 0px 10px; width: 1500%;"
                  ></v-text-field>
                </v-form>
                <input type="date" v-model="data" class="inputDate" placeholder="Data">
              </div>

                  <!-- SELECIONAR OBSERVAÇÃO -->
                  <v-autocomplete
                    label="Selecionar Observação"
                    :items="['Brasil', 'Pará', 'Ananindeua', 'Ver-o-peso']"
                    style="margin: 16px 10px 0px 10px">
                  </v-autocomplete>
             </div>
           </v-card>

              <!-- RENDERIZAR CARDS DINAMICAMENTE -->
              <div v-for="(card, index) in cards" :key="index">
                <v-card style="margin-top: 15px;">
                  <div class="first-Part">
                    <div class="apagarCards">
                      <v-icon color="red" icon="mdi-minus" size="x-small" id="btn-plus" @click="apagarCard(index)"></v-icon>
                    </div>
                    <div class="input-date">
                      <v-form @submit.prevent>
                        <v-text-field
                          v-model="card.itemPesquisa"
                          :rules="itemRules"
                          label="Item de pesquisa"
                          style="margin: 16px 10px 0px 10px; width: 1500%;">
                        </v-text-field>
                      </v-form>
                      <input type="date" v-model="data" class="inputDate" placeholder="Data">
                    </div>
                    
                    
                    <v-autocomplete
                      label="Selecionar Observação"
                      :items="['Brasil', 'Pará', 'Ananindeua', 'ver-o-peso']"
                      v-model="card.observacao"
                      style="margin: 16px 10px 0px 10px;">
                    </v-autocomplete>
                  </div>
                </v-card>
              </div>

        <!-- BOTÕES DE AÇÃO  -->
            <div class="observacao">
              <div>
                <v-btn prepend-icon="mdi-play" style="background-color: rgb(157, 247, 115);">
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
      itemPesquisa: '',
      itemRules: [
        value => {
          if (value) return true
          return 'Campo obrigatório!'
        }
      ],
    }
  },
  methods: {
    gerarNovoCard() {
      this.cards.push({
        itemPesquisa: '',
        observacao: ''
      })
    },

    limparInputs() {
      this.itemPesquisa = ''
      for (let i = 0; i < this.cards.length; i++) {
        this.cards[i].itemPesquisa = '';
      }
    },

    apagarCard(index) {
      this.cards.splice(index, 1);
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
  }
};

</script>

<style>
.first-Part {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 5px 20px;
}

.input-date {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.inputDate {
  margin-right: 50px;
  font-size: 0.95em;
  color: gray
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

