<template>
  <header class="bg-green-500 text-white p-4 flex items-center justify-between relative">
    <!-- Menu Hamburger -->
    <button @click="toggleSidebar" class="lg:hidden">
      <i class="fas fa-bars"></i>
    </button>

    <div class="flex items-center flex-grow">
      <i class="fas fa-code mr-2"></i>
      <h1 class="text-lg font-bold">DataStone - Teste VueJS</h1>
    </div>

    <!-- Ícones e Notificações -->
    <div class="hidden lg:flex items-center space-x-4">
      <!-- Ícones de Notificações -->
      <div class="relative">
        <button @click="toggleNotifications">
          <i class="fas fa-bell"></i>
        </button>
        <!-- Submenu de Notificações -->
        <div v-show="showNotifications" class="absolute top-full right-0 mt-2 bg-white p-2 rounded shadow-md text-green-500">
          <p>Vai Palmeiras!!</p>
          <p>Dode Campeão</p>
        </div>
      </div>

      <!-- Ícone do Perfil -->
      <div class="relative">
        <button @click="toggleProfile">
          <i class="fas fa-user"></i>
        </button>
        <!-- Submenu do Perfil -->
        <div v-show="showProfile" class="absolute top-full right-0 mt-2 bg-white p-2 rounded shadow-md text-green-500">
          <p>Perfil</p>
          <p>Configurações</p>
          <p>Sair</p>
        </div>
      </div>
    </div>

    <!-- Sidebar -->
    <transition name="fade">
      <div v-show="showSidebar" class="lg:hidden fixed inset-0 bg-white bg-opacity-50" @click="toggleSidebar"></div>
    </transition>
    <transition name="slide">
      <div v-show="showSidebar" class="lg:hidden fixed inset-y-0 left-0 mt-6 bg-gray-800 text-white p-4 transform translate-x-0">
        <button @click="toggleSidebar" class="text-white lg:hidden absolute top-4 right-4">
          <i class="fas fa-times"></i>
        </button>
        <div class="submenu">
          <router-link to="/home">Home</router-link>
          <router-link to="https://github.com/emersonamorim-dev">GitHub</router-link>
          <router-link to="https://www.linkedin.com/in/emerson-amorim-dev/">Perfil</router-link>
        </div>
      </div>
    </transition>
  </header>
</template>

<script>
export default {
  data() {
    return {
      showSidebar: false,
      showNotifications: false,
      showProfile: false,
    };
  },
  methods: {
    toggleSidebar() {
      this.showSidebar = !this.showSidebar;
    },
    toggleNotifications() {
      this.showNotifications = !this.showNotifications;
      if (this.showNotifications) {
        this.showProfile = false;
      }
    },
    toggleProfile() {
      this.showProfile = !this.showProfile;
      if (this.showProfile) {
        this.showNotifications = false;
      }
    },
    closeSubmenus() {
      this.showNotifications = false;
      this.showProfile = false;
    },
  },
};
</script>

<style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .slide-enter-active, .slide-leave-active {
    transition: transform 0.5s;
  }
  .slide-enter, .slide-leave-to {
    transform: translateX(-100%);
  }

  .submenu {
    width: 200px;
  }
</style>
