window.timer = undefined;
class Carousel {
    constructor(obj) {
        console.log(obj.data.length, obj);
        if (obj.data.length == 0) {
            return;
        }
        clearInterval(window.timer);
        this.id = document.getElementById(obj.domId);
        while (this.id.firstChild) {
            this.id.removeChild(this.id.firstChild);
        }

        this.items = obj.data;
        while (this.items.length < 3) {
            this.items.push(this.items[0])
        }

        this.createDom(this.items, this.id);
        if (obj.navigator) {
            this.navigator(this.id);
        }
        this.currentImage = 1;
        this.nextImage = 2;
        this.previousImage = 0;
        if (obj.autoMovement && obj.autoMovement.status) {
            window.timer = setInterval(() => {
                this.next();
            }, obj.autoMovement.time || 1000)
        }
    }

    createDom(items, parent) {
        var ul = document.createElement('ul');
        ul.setAttribute('class', 'carousel-parent')
        parent.appendChild(ul);
        for (var i = 0; i < items.length; i++) {
            var li = document.createElement('li');
            li.setAttribute('id', i);
            li.setAttribute('class', 'carousel-children');

            let imageHolder = document.createElement('div');
            imageHolder.setAttribute('class', 'item-image');
            imageHolder.style.backgroundColor = items[i].color;

            li.appendChild(imageHolder);
            let itemName = document.createElement('div');
            itemName.setAttribute('class', 'item-text');
            itemName.innerText = items[i].text;
            li.appendChild(itemName);

            let itemPrice = document.createElement('div');
            itemPrice.setAttribute('class', 'item-price');
            itemPrice.innerText = items[i].price + 'Rs';
            li.appendChild(itemPrice);


            // li.style.backgroundImage = li.style.backgroundImage = 'url("' + items[i].image + '")';
            ul.appendChild(li);
            // li.innerHTML = li.innerHTML + items[i].text;
            if (i == 1) li.classList.add("current");
            if (i == 2) li.classList.add("next");
            if (i == 0) li.classList.add("previous");

        }
    }

    navigator(parent) {
        let pre = document.createElement('span');
        pre.innerText = "< Prev";
        pre.setAttribute('class', 'preNavigator');
        let next = document.createElement('span');
        next.innerText = "Next >";
        next.setAttribute('class', 'nextNavigator')
        let that = this;
        pre.addEventListener('click', function () {
            this.previous();
        }.bind(that));
        next.addEventListener('click', function () {
            this.next();
        }.bind(that));
        parent.appendChild(pre);
        parent.appendChild(next);
    }

    previous() {

        this.removeClasses();

        let cimage = this.previousImage;
        let nimage = (this.currentImage + 1) < this.items.length ? this.currentImage : (this.currentImage) % this.items.length;
        let pimage = (this.previousImage - 1) < 0 ? this.items.length - 1 : (this.previousImage - 1) % this.items.length;

        document.getElementById(nimage).classList.add("next");
        document.getElementById(cimage).classList.add("current");
        document.getElementById(pimage).classList.add("previous");
        this.currentImage = cimage;
        this.nextImage = nimage;
        this.previousImage = pimage;
    }

    next() {
        this.removeClasses()
        let cimage = this.nextImage;
        let nimage = (this.nextImage + 1) < this.items.length ? this.nextImage + 1 : 0;
        let pimage = this.currentImage;

        document.getElementById(nimage).classList.add("next");
        document.getElementById(cimage).classList.add("current");
        document.getElementById(pimage).classList.add("previous");
        this.currentImage = cimage;
        this.nextImage = nimage
        this.previousImage = pimage;
    }

    removeClasses() {
        document.getElementsByClassName('previous')[0].classList.remove("previous");
        document.getElementsByClassName('next')[0].classList.remove("next");
        document.getElementsByClassName('current')[0].classList.remove("current");
    }
}

export default Carousel;