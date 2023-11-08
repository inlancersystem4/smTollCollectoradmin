<script>
export default {

}
</script>

<template>
    <div class="table-footer">

        <div class="table-resuits-count custom-dropdown">

            <p class="all-items-list-count">

                <span>1</span>

                -

                <span>13</span>

                of

                <span>200</span>

                results

            </p>


            <ul class="custom-dropdown-list" id="paginationDrop">
                <li class="dropdown-item">
                    <a href="#" class="dropdown-link">
                        <p class="dropdown-link-title">Fit to screen</p>
                    </a>
                </li>
                <li class="dropdown-item">
                    <a href="#" class="dropdown-link">
                        <p class="dropdown-link-title">Show all results</p>
                    </a>
                </li>
                <li class="dropdown-item">
                    <a href="#" class="dropdown-link selected-dropdown-option">
                        <p class="dropdown-link-title">10</p>
                    </a>
                </li>
                <li class="dropdown-item">
                    <a href="#" class="dropdown-link">
                        <p class="dropdown-link-title">25</p>
                    </a>
                </li>
                <li class="dropdown-item">
                    <a href="#" class="dropdown-link">
                        <p class="dropdown-link-title">50</p>
                    </a>
                </li>
            </ul>

        </div>


        <div class="table-pagination">

            <p class="total-pages-count">
                <span> 1 </span>
                of
                <span>16</span>
                pages
            </p>


            <div class="pagination-btn-group">
                <button class="pagination-btn pagination-btn-disabled">Prev</button>
                <button class="pagination-btn">Next</button>
            </div>

        </div>

    </div>
</template>