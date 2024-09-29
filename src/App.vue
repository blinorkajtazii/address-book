<template>
  <div id="app" class="p-4">
    <h1 class="text-3xl font-bold mb-6 text-center">Address Book</h1>

    <div class="mb-4">
      <ul class="flex border-b">
        <li class="mr-1">
          <router-link
            to="/"
            class="inline-block py-2 px-4 text-blue-500 hover:underline border-b-2"
            active-class="border-blue-500 font-bold"
            exact-active-class="border-blue-600"
          >
            Contact List
          </router-link>
        </li>
        <li>
          <router-link
            to="/add"
            class="inline-block py-2 px-4 text-blue-500 hover:underline border-b-2"
            active-class="border-blue-500 font-bold"
            exact-active-class="border-blue-600"
          >
            Add Contact
          </router-link>
        </li>
      </ul>
    </div>

    <router-view></router-view>
  </div>
</template>

<script lang="ts">
export default {
  name: "App",
};
</script>
