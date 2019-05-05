<template>
  <div class="wrapper">
    <h1>My Carousel</h1>
    <div class="search-wrapper">
      <table class>
        <tr>
          <td>
            <div tabindex="-1" id="tries" class="input-element">
              <input
                type="text"
                class="form-element"
                name="search"
                v-model="searchString"
                placeholder="Enter search keys"
                @blur="searchProducts"
              >
            </div>
            <div class="search-keys" v-if="searchKeys.length > 0">
              Showing results for:
              <ul>
                <li
                  v-for="(key, kindex) in searchKeys"
                  :key="kindex"
                  @click="removeKeyFromSearch(kindex)"
                >
                  <div class="delete">
                    <img src="../assets/cross.svg" alt>
                  </div>
                  {{ key }}
                </li>
              </ul>
            </div>
          </td>
        </tr>
      </table>
    </div>

    <div id="testCarousel"></div>
  </div>
</template>

<script>
import Carousel from "../lib/carousel";
import service from "../service-calls/service";

export default {
  name: "Home",
  props: {
    msg: String
  },
  data: function() {
    return {
      test: 100,
      searchString: "",
      sortType: "",
      filteredProducts: [],
      searchKeys: [],
      products: []
    };
  },
  mounted: function() {
    service.getProducts().then(data => {
      let products = data.data.products;
      this.filteredProducts = products;
      this.products = products;
      this.renderCarousel("testCarousel", this.products, true, {
        status: false,
        time: 5000
      });
    });

    // new Carousel({
    //   domId: "testCarousel",
    //   data: this.products,
    //   navigator: false,
    //   autoMovement: {
    //     status: true,
    //     time: 5000
    //   }
    // });
  },
  methods: {
    renderCarousel: function(
      id,
      items,
      navigator = true,
      timer = { status: false, time: 1000 }
    ) {
      new Carousel({
        domId: id,
        data: items,
        navigator: navigator,
        autoMovement: timer
      });
    },
    searchProducts() {
      this.filteredProducts = [];
      let products = Object.create(this.products);
      let keys =
        this.searchString.trim().length > 0
          ? this.searchString.trim().split(" ")
          : [];

      this.searchKeys = keys.filter(key => {
        if (key.trim().length > 0) {
          return key;
        }
      });

      if (this.searchKeys.length > 0) {
        for (let i = 0; i < products.length; i++) {
          for (let j = 0; j < this.searchKeys.length; j++) {
            if (
              products[i].text
                .toLowerCase()
                .indexOf(this.searchKeys[j].toLowerCase()) > -1
            ) {
              if (this.filteredProducts.indexOf(products[i]) < 0) {
                this.filteredProducts.push(products[i]);
              }
            }
          }
        }
      } else {
        this.filteredProducts = [...this.products];
      }
      this.renderCarousel("testCarousel", this.filteredProducts);
    },
    clearAllFilters() {
      this.searchString = "";
      this.searchProducts();
    },
    removeKeyFromSearch(index) {
      this.searchKeys.splice(index, 1);
      this.searchString = this.searchKeys.join(" ");
      this.searchProducts();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../assets/main";

#testCarousel {
  height: 300px;
  position: relative;
  margin: 150px 0;
}
.preNavigator,
.nextNavigator {
  position: absolute;
  z-index: 9999;
  top: 50%;
  font-size: 16px;
  font-weight: bold;
}

.preNavigator {
  left: 5%;
}
.nextNavigator {
  right: 5%;
}

.wrapper {
  overflow: hidden;
  height: 100%;

  .carousel-parent {
    position: relative;
    height: 100%;
  }

  .carousel-children {
    width: 300px;
    position: absolute;
    transform: translate(-50%, 0%);
    background-repeat: no-repeat;
    background-size: 100%;
    display: none;
    background-size: cover;
    padding-bottom: 5px;
    -webkit-box-shadow: 2px 2px 10px 0px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 2px 2px 10px 0px rgba(0, 0, 0, 0.75);
    box-shadow: 2px 2px 10px 0px rgba(0, 0, 0, 0.75);

    .item-image {
      height: 300px;
    }
    .item-text,
    .item-price {
      margin: 10px 10px 5px;
      font-weight: bold;
      text-transform: capitalize;
    }
    .item-price {
      font-size: 16px;
    }
    .item-text {
      font-size: 18px;
    }

    &.previous {
      left: 20%;
      display: block;
      transition: 0.2s;
    }
    &.current {
      left: 40%;
      transform: scale(1.3);
      display: block;
      z-index: 999;
      transition: 0.2s;
    }
    &.next {
      left: 80%;
      display: block;
      transition: left 0.2s;
    }
  }
  .search-wrapper {
    width: 50%;
    margin: auto;
    padding-bottom: 20px;
    border-bottom: 1px solid #ccc;
    table {
      width: 100%;
      tr {
        vertical-align: top;
      }
      td {
        width: 50%;
        padding: 0 15px;
        &:first-child {
          padding-left: 0;
        }
        &:last-child {
          padding-right: 0;
        }
        .search-keys {
          margin-top: 15px;

          ul {
            padding: 0;
            display: inline-block;

            li {
              position: relative;
              list-style: none;
              display: inline-block;
              padding: 5px 10px;
              border: 1px solid #ccc;
              margin-right: 10px;

              .delete {
                float: left;
                margin-top: 2px;
                margin-right: 5px;
                padding-right: 5px;
                cursor: pointer;
                width: 15px;
                img {
                  width: 100%;
                }
              }
            }
          }
        }

        .buttons {
          ul {
            padding: 0;
            display: inline-block;
            background-color: #ccc;
            float: right;

            li {
              list-style: none;

              .button {
                padding: 10px 20px;
                background-color: #f00;
                display: inline-block;
                color: #fff;
                border-radius: 5px;
                border: none;
              }
            }
          }
        }
      }
    }
  }
}
</style>
