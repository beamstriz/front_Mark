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
          src=""
          alt="Foto do usuário"
        ></v-img>
        </v-avatar>

        <v-btn icon>
            <v-icon icon="mdi-logout"></v-icon>
        </v-btn>
      </template>
    </v-app-bar>

    <!-- DASHBOARD -->
    <v-main>
      <v-container>
        <h3>Olá, usuário!</h3>
        <v-card title="Gerar pesquisa">
          <v-divider></v-divider>
          <br>

          <!-- BOTÃO OBSERVAÇÃO -->
          <div class="first-Part">
            <div class="observacao">
              <v-autocomplete
                label="Selecionar Observação"
                :items="['Brasil', 'Pará', 'Ananindeua', 'Ver-o-peso']"
                style="margin: 16px 10px 0px 10px">
              </v-autocomplete>
              <v-btn icon="mdi-plus" variant="tonal" color="blue" style="margin: 20px 7px 0px 10px;"></v-btn>
            </div>


            <div class="observacao">
              <v-btn prepend-icon="mdi-play" style="background-color: rgb(157, 247, 115);">
                Iniciar
              </v-btn>

              <v-btn prepend-icon="mdi-delete" style="background-color: rgb(241, 230, 106); margin-left:50px">
                Limpar
              </v-btn>

              <v-btn prepend-icon="mdi-close" style="background-color: rgb(241, 106, 106); margin-left:50px">
                Parar
              </v-btn>
            </div>
        </div>
            <br>
        </v-card>
      </v-container>
    </v-main>
 

  </v-app>
</template>

<script>
import { ref } from 'vue';

export default {
  data() {
    return {
      dialogm1: '',
      dialog: false,
      tema: "light"
    };
  }
};

const Menuaberto = ref(false);


</script>

<script setup>

// const Menuaberto = ref(value: false)
</script>

<style>
.first-Part {
  display: flex;
  flex-direction: column;
  justify-content: center;

  margin: 5px 20px;
}

.observacao {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

</style>

