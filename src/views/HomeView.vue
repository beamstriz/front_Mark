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
        <v-card title="Gerar pesquisa"><v-divider></v-divider>
          <!-- Botão Observação -->
          
            <v-row align-lg="center">
              <v-dialog
                v-model="dialog"
                scrollable
                width="auto"
                >
                  <template v-slot:activator="{ props }">
                   <v-btn
                     color="primary"
                     v-bind="props"
                     >
                      Selecionar Observação
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>Selecione a Observação</v-card-title>
                    <v-divider></v-divider>
                    <v-card-text style="height 300px">
                      <v-radio-group
                        v-model="dialog"
                        column
                        >
                        <v-radio
                          label="Brasil"
                          value="brasil"
                        ></v-radio>
                      </v-radio-group>
                    </v-card-text>

                    <v-card-actions>
                      <v-btn
                        color="blue-darken"
                        variant="text"
                        @click="dialog = false"
                      >
                        Salvar
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
            </v-row>
          
          
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
.aviso {
  color: red
}
</style>

