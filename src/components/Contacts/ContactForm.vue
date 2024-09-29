<template>
  <div class="max-w-lg mx-auto p-8 bg-white rounded-lg shadow-md">
    <h1 class="text-2xl font-bold mb-6">
      {{ isEdit ? "Edit Contact" : "Add New Contact" }}
    </h1>
    <form @submit.prevent="handleSubmit">
      <div class="mb-4">
        <label class="block text-gray-700 mb-1">First Name</label>
        <input
          v-model="form.firstName"
          required
          class="w-full p-2 border rounded-lg"
          placeholder="Enter First Name"
        />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 mb-1">Last Name</label>
        <input
          v-model="form.lastName"
          required
          class="w-full p-2 border rounded-lg"
          placeholder="Enter Last Name"
        />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 mb-1">Email</label>
        <input
          v-model="form.email"
          type="email"
          required
          class="w-full p-2 border rounded-lg"
          placeholder="Enter Email Address"
        />
      </div>
      <div class="mb-6">
        <label class="block text-gray-700 mb-1">Country</label>
        <select
          v-model="form.country"
          required
          class="w-full p-2 border rounded-lg"
        >
          <option disabled value="">Select a Country</option>
          <option v-for="country in countries" :key="country" :value="country">
            {{ country }}
          </option>
        </select>
      </div>
      <button
        type="submit"
        class="w-full py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        {{ isEdit ? "Update Contact" : "Save Contact" }}
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getData, setData } from "../../utils/storage";
import { getNames } from "country-list";

export default defineComponent({
  setup() {
    const router = useRouter();
    const route = useRoute();
    const countries = ref(getNames());
    const isEdit = ref(false);
    const form = reactive({
      firstName: "",
      lastName: "",
      email: "",
      country: "",
    });

    const loadContact = (id: string | null) => {
      const contacts = getData("contacts") || [];
      const contact = contacts.find((c: any) => c.id == id);
      if (contact) {
        Object.assign(form, contact);
        isEdit.value = true;
      }
    };

    const handleSubmit = () => {
      const contacts = getData("contacts") || [];
      if (isEdit.value) {
        const index = contacts.findIndex((c: any) => c.id == route.params.id);
        if (index !== -1) contacts[index] = { ...contacts[index], ...form };
      } else {
        const newContact = { ...form, id: Date.now() };
        contacts.push(newContact);
      }
      setData("contacts", contacts);
      router.push("/");
    };

    onMounted(() => {
      if (route.params.id) loadContact(route.params.id as string);
    });

    return { form, countries, handleSubmit, isEdit };
  },
});
</script>
