import { defineStore } from 'pinia';
import { fetchWrapper } from '@/helpers';
import router from '@/router';
import { useAlertStore } from '@/stores';

const baseUrl = `${import.meta.env.VITE_API_URL}`;

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        user: JSON.parse(localStorage.getItem('user')),
        returnUrl: null
    }),
    actions: {
        async login(email, password) {
            var form_data = new FormData();
            form_data.append('user_email', email);
            form_data.append('user_password', password);
            try {
                const user = await fetchWrapper.post(`${baseUrl}/admin/sign-in`, form_data);

                if (user.success == 1) {
                    var new_user = {
                        token: user.session_token
                    }
                    this.user = new_user;
                    localStorage.setItem('user', JSON.stringify(new_user));

                    // Add Role In localStorage for Manageer and Admin Show Defiferent sidebar values
                    localStorage.setItem('role', JSON.stringify(user.user_role));

                    router.push({ name: 'home' });
                }
                else {
                    const alertStore = useAlertStore();
                    alertStore.error(user.message);
                }

            } catch (error) {
                const alertStore = useAlertStore();
                alertStore.error(error);
            }
        },
        logout() {
            this.user = null;
            localStorage.removeItem('user');
            router.push('/login');
        },
        chnageTitle(title, description) {
            document.title = title
            const metaTag = document.createElement('meta');
            metaTag.setAttribute('name', 'description');
            metaTag.setAttribute('content', description);
            const ifdescription = document.querySelector('meta[name="description"]');

            if (ifdescription) {
                ifdescription.parentNode.replaceChild(metaTag, ifdescription);
            } else {
                document.head.appendChild(metaTag);
            }
        },
        async mailcheck(email) {
            var form_data = new FormData();
            form_data.append('email', email);
            try {
                const e_data = await fetchWrapper.post(`${baseUrl}/checkuser`, form_data);
                // update pinia state
                this.email = e_data;
                // store user details and jwt in local storage to keep user logged in between page refreshes
                localStorage.setItem('email', JSON.stringify(this.email));

                // redirect to previous url or default to home page
                router.push(this.returnUrl || '/account/password');
            } catch (error) {
                const alertStore = useAlertStore();
                alertStore.error(error);
            }
        },
    }
});
