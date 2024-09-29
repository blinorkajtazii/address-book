import { createRouter, createWebHistory } from "vue-router";
import ContactList from "../components/Contacts/ContactList.vue";
import ContactForm from "../components/Contacts/ContactForm.vue";

const routes = [
  { path: "/", component: ContactList },
  { path: "/add", component: ContactForm },
  { path: "/edit/:id", component: ContactForm, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
