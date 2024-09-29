<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-6">Contact List</h1>

    <div>
      <table class="w-full bg-white rounded-lg shadow-lg">
        <thead class="bg-gray-100">
          <tr>
            <th class="p-3 border">First Name</th>
            <th class="p-3 border">Last Name</th>
            <th class="p-3 border">Email</th>
            <th class="p-3 border">Country</th>
            <th class="p-3 border">Actions</th>
          </tr>
        </thead>
        <tbody v-if="contacts.length">
          <tr
            v-for="contact in contacts"
            :key="contact.id"
            class="hover:bg-gray-50"
          >
            <td class="p-3 border">{{ contact.firstName }}</td>
            <td class="p-3 border">{{ contact.lastName }}</td>
            <td class="p-3 border">{{ contact.email }}</td>
            <td class="p-3 border">{{ contact.country }}</td>
            <td class="p-3 border">
              <button
                @click="editContact(contact.id)"
                class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
              >
                Edit
              </button>
              <button
                @click="deleteContact(contact.id)"
                class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
        <td
          colspan="5"
          v-if="!loading && contacts.length === 0"
          class="text-center text-gray-500"
        >
          No data available
        </td>

        <Loader :isLoading="loading" class="mb-6" />
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getData, setData } from "../../utils/storage";
import Loader from "../Loader.vue";

export default defineComponent({
  components: { Loader },
  setup() {
    const contacts = ref([]);
    const loading = ref(true);
    const router = useRouter();

    const fetchContacts = () => {
      loading.value = true;
      setTimeout(() => {
        contacts.value = getData("contacts") || [];
        loading.value = false;
      }, 1000);
    };

    const deleteContact = (id: number) => {
      contacts.value = contacts.value.filter((c: any) => c.id !== id);
      setData("contacts", contacts.value);
    };

    const editContact = (id: number) => {
      router.push(`/edit/${id}`);
    };

    onMounted(() => {
      fetchContacts();
    });

    return { contacts, loading, deleteContact, editContact };
  },
});
</script>
