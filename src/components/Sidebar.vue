<script>

export default {
    computed: {
        isTollCrudActive() {
            return this.$route.matched.some(route => route.path === '/toll-crud' || route.path === '/add-toll_plaza');
        },
        islaneCrudActive() {
            return this.$route.matched.some(route => route.path === '/lane-crud');
        },
        isvehicleCrudActive() {
            return this.$route.matched.some(route => route.path === '/vehicle-crud');
        },
        isshiftCrudActive() {
            return this.$route.matched.some(route => route.path === '/shift-crud');
        }
    }
}

</script>

<template>
    <aside class="main-sidebar">

        <div class="sidebar-content">

            <div class="sidebar-avatar-header">

                <div class="user-profile-avatar">
                    <img
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&amp;fit=crop&amp;q=80&amp;ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&amp;w=1374">
                </div>

                <div class="user-profile-btn" id="Open_mini_sidebar">
                    <img src="../assets/img/icons/burger-menu.svg" class="img-not-selected">
                </div>

                <div class="user-profile-btn" id="Responsive_Close_sidebar">
                    <img src="../assets/img/icons/close-icon.svg" class="img-not-selected close-menu">
                </div>

            </div>



            <div class="user-details">
                <p class="user-owernship">Store</p>
                <h5 class="user-name">Tekla Fabrics</h5>
            </div>


            <div class="sidebar-main-content">


                <ul class="main-pages-list">

                    <li class="list-items">
                        <router-link to="/" class="list-link" active-class="link_active">
                            <div class="link-items">
                                <img src="../assets/img/icons/search.svg" class="img-not-selected">
                                <p class="link-title">Home</p>
                            </div>
                        </router-link>
                    </li>

                    <li class="list-items">
                        <router-link to="/toll-crud" class="list-link" :class="{ link_active: isTollCrudActive }">
                            <div class="link-items">
                                <img src="../assets/img/icons/bell.svg" class="img-not-selected">
                                <p class="link-title">Toll Plaza Crud</p>
                            </div>
                        </router-link>
                    </li>

                    <li class="list-items">
                        <router-link to="/lane-crud" class="list-link" :class="{ link_active: islaneCrudActive }">
                            <div class="link-items">
                                <img src="../assets/img/icons/bell.svg" class="img-not-selected">
                                <p class="link-title">Lane Crud</p>
                            </div>
                        </router-link>
                    </li>

                    <li class="list-items">
                        <router-link to="/vehicle-crud" class="list-link" :class="{ link_active: isvehicleCrudActive }">
                            <div class="link-items">
                                <img src="../assets/img/icons/bell.svg" class="img-not-selected">
                                <p class="link-title">Vehicle Crud</p>
                            </div>
                        </router-link>
                    </li>

                    <li class="list-items">
                        <router-link to="/shift-crud" class="list-link" :class="{ link_active: isshiftCrudActive }">
                            <div class="link-items">
                                <img src="../assets/img/icons/bell.svg" class="img-not-selected">
                                <p class="link-title">Shirt Crud</p>
                            </div>
                        </router-link>
                    </li>

                </ul>


                <div>

                    <div class="sidebar-section-heading">

                        <p class="section-title">Favorites</p>

                        <div class="add-new-flied-btn">
                            <img src="../assets/img/icons/plus.svg">
                        </div>


                    </div>


                    <ul class="favorites-pages-list">

                        <li class="list-items">
                            <router-link to="/" class="list-link">

                                <div class="list-icon">💸</div>

                                <p class="link-title">Tax Rules</p>

                            </router-link>
                        </li>


                        <li class="list-items">
                            <router-link to="/" class="list-link">

                                <div class="list-icon">🏝</div>

                                <p class="link-title">Summer ‘21</p>

                            </router-link>
                        </li>

                    </ul>



                </div>

            </div>


        </div>


    </aside>


    <aside class="mini-main-sidebar mini-main-sidebar-deactive">

        <div class="sidebar-content">

            <div class="sidebar-avatar-header">

                <div class="user-profile-avatar">
                    <img
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&amp;fit=crop&amp;q=80&amp;ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&amp;w=1374">
                </div>

            </div>



            <div class="sidebar-main-content">


                <ul class="main-pages-list">

                    <li class="list-items">
                        <router-link to="/" class="list-link">
                            <div class="link-items">
                                <img src="../assets/img/icons/search.svg" class="img-not-selected">
                            </div>
                        </router-link>
                    </li>

                    <li class="list-items">
                        <router-link to="/" class="list-link">
                            <div class="link-items">
                                <img src="../assets/img/icons/bell.svg" class="img-not-selected">
                            </div>
                            <div class="count">12</div>
                        </router-link>
                    </li>


                    <li class="list-items">
                        <router-link to="/" class="list-link">
                            <div class="link-items">
                                <img src="../assets/img/icons/tag.svg" class="img-not-selected">
                            </div>
                        </router-link>
                    </li>

                    <li class="list-items">
                        <router-link to="/" class="list-link">
                            <div class="link-items">
                                <img src="../assets/img/icons/users.svg" class="img-not-selected">
                            </div>
                        </router-link>
                    </li>


                    <li class="list-items">
                        <router-link to="/" class="list-link">
                            <div class="link-items">
                                <img src="../assets/img/icons/cart.svg" class="img-not-selected">
                            </div>
                        </router-link>
                    </li>


                    <li class="list-items">
                        <router-link to="/" class="list-link link_active">
                            <div class="link-items">
                                <img src="../assets/img/icons/buildings.svg" class="img-not-selected">
                            </div>
                        </router-link>
                    </li>


                    <li class="list-items">
                        <router-link to="/" class="list-link">
                            <div class="link-items">
                                <img src="../assets/img/icons/sale.svg" class="img-not-selected">
                            </div>
                        </router-link>
                    </li>

                    <li class="list-items">
                        <router-link to="/" class="list-link">
                            <div class="link-items">
                                <img src="../assets/img/icons/gift.svg" class="img-not-selected">
                            </div>
                        </router-link>
                    </li>

                    <li class="list-items">
                        <router-link to="/" class="list-link">
                            <div class="link-items">
                                <img src="../assets/img/icons/cash.svg" class="img-not-selected">
                            </div>
                        </router-link>
                    </li>

                    <li class="list-items">
                        <router-link to="/" class="list-link">
                            <div class="link-items">
                                <img src="../assets/img/icons/settings.svg" class="img-not-selected">
                            </div>
                        </router-link>
                    </li>

                </ul>


                <div>

                    <div class="sidebar-section-heading">


                        <div class="add-new-flied-btn">
                            <img src="../assets/img/icons/plus.svg">
                        </div>


                    </div>


                    <ul class="favorites-pages-list">

                        <li class="list-items">
                            <router-link to="/" class="list-link">

                                <div class="list-icon">💸</div>


                            </router-link>
                        </li>


                        <li class="list-items">
                            <router-link to="/" class="list-link">

                                <div class="list-icon">🏝</div>


                            </router-link>
                        </li>

                    </ul>



                </div>

            </div>


        </div>


    </aside>
</template>

