<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-6">Contact List</h1>

    <div class="responsive-table">
      <table class="w-full bg-white rounded-lg shadow-lg hidden md:table">
        <thead class="bg-gray-100">
          <tr>
            <th class="p-2 border">First Name</th>
            <th class="p-2 border">Last Name</th>
            <th class="p-2 border">Email</th>
            <th class="p-2 border">Country</th>
            <th class="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody v-if="contacts.length">
          <tr
            v-for="contact in contacts"
            :key="contact.id"
            class="hover:bg-gray-50"
          >
            <td class="p-2 border">{{ contact.firstName }}</td>
            <td class="p-2 border">{{ contact.lastName }}</td>
            <td class="p-2 border">{{ contact.email }}</td>
            <td class="p-2 border">{{ contact.country }}</td>
            <td class="p-2 border">
              <button
                @click="editContact(contact.id)"
                class="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
              >
                <font-awesome-icon icon="pen" />
              </button>
              <button
                @click="deleteContact(contact.id)"
                class="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                <font-awesome-icon icon="trash" />
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
      </table>

      <div class="md:hidden grid grid-cols-1 gap-4">
        <div
          v-for="contact in contacts"
          :key="contact.id"
          class="bg-white rounded-lg shadow-lg p-4 flex justify-between items-center"
        >
          <div>
            <h2 class="font-bold">
              {{ contact.firstName }} {{ contact.lastName }}
            </h2>
            <p class="text-gray-600">{{ contact.email }}</p>
            <p class="text-gray-600">{{ contact.country }}</p>
          </div>
          <div>
            <button
              @click="editContact(contact.id)"
              class="p-2 text-blue-500 hover:text-blue-600"
              aria-label="Edit contact"
            >
              <font-awesome-icon icon="pen" />
            </button>
            <button
              @click="deleteContact(contact.id)"
              class="p-2 text-red-500 hover:text-red-600"
              aria-label="Delete contact"
            >
              <font-awesome-icon icon="trash" />
            </button>
          </div>
        </div>
      </div>

      <Loader :isLoading="loading" class="mb-6" />
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

<style scoped>
@media (max-width: 640px) {
  h1 {
    font-size: 1.5rem;
  }
  table {
    display: none;
  }
  .responsive-table {
    display: flex;
    flex-direction: column;
  }
}

@media (min-width: 640px) {
  th,
  td {
    padding: 1rem;
    font-size: 1rem;
  }
}
</style>
