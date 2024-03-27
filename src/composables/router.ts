import {computed} from "vue";
// import {RouteLocationRaw} from "#build/node_modules/vue-router";
const route = useRoute();

// pass it a string to check if the route has a parent with that name. its wrapped in a computed so that its reactive
export const isChild = computed(() => (name: string) => {
    return route.matched.map((item) => {
        return item.name;
    }).includes(name);
});
