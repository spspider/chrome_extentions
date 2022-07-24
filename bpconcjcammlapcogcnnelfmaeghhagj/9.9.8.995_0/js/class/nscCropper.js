(() => {
    if (window.nscCropper) {
        return;
    }

    class nscCropperCore {
        constructor() {
            this.timerScroll = null;
            this.timerPopup = null;
            this.popup = null;
            this.wrapper = null;
            this.container = null;
            this.lens_wrapper = null;
            this.size = null;
            this.crop_control = null;
            this.crop_more = null;
            this.outline = {
                top: null,
                left: null,
                right: null,
                bottom: null
            };

            this.defaultOptions = {
                displayShow: 'flex',
                displayHide: 'none',
                wrapperFull: true,
                scrollEnable: true,
            }

            this.options = {
                displayShow: 'flex',
                displayHide: 'none',
                wrapperFull: true,
                scrollEnable: true,
            }

            this.points = {
                x: 0,
                y: 0,
                w: 0,
                h: 0
            }

            this.mouse = {
                x: 0,
                y: 0
            }

            this.startMouse = {
                startX: 0,
                startY: 0
            }

            this.startOffset = {
                startPageYOffset: 0,
                startPageXOffset: 0
            }

            this.center = {
                x: 0,
                y: 0
            }

            this.moveBorder = null;

            // this.mounted();

            // (async () => {
            //     window.addEventListener('wheel', (e) => {
            //         e.preventDefault()
            //     }, await this.preventDefaultWheel());
            //
            //     window.addEventListener('keydown', this.preventDefaultForScrollKeys, false);
            // })()
        }

        async openPopup() {
            const option = await nscCore.sendMessage({
                operation: 'get_option',
                key: 'popupActionMessageCrop'
            }) === 'true';

            if (option) {
                this.popup = document.createElement('div')
                this.popup.className = 'nsc-popup-action-message';
                this.popup.innerText = chrome.i18n.getMessage("popupActionMessageCrop");

                document.documentElement.appendChild(this.wrapper)
                // document.body.appendChild(this.wrapper)

                this.timerPopup = window.setTimeout(this.removePopup, 3000)
            }
        }

        removePopup() {
            clearTimeout(this.timerPopup)
            this.popup && this.popup.remove();
        }

        async setImage(image) {
            this.image = await nscExt.imageLoad(image);
        }

        setOptions(options) {
            this.options = {
                ...this.defaultOptions,
                ...options,
            }
        }

        preventDefaultWheel() {
            return new Promise(function (resolve) {
                try {
                    window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
                        get: function () {
                            resolve({passive: false})
                        }
                    }));
                } catch (e) {
                    resolve(false)
                }
            });
        }

        preventDefaultForScrollKeys() {
            const keys = {37: 1, 38: 1, 39: 1, 40: 1};

            if (keys[e.keyCode]) {
                e.preventDefault();
                return false;
            }
        }

        log(arg) {
            // console.log(arg)
        }

        event() {
            document.documentElement.style.scrollBehavior = "initial";

            document.onmousemove = ({x, y}) => {
                this.log('move cursor')
                this.mouse = {x, y}
                this.lens()
            };

            document.onmousedown = (event) => {
                this.removePopup()

                const {pageYOffset, pageXOffset} = window;
                this.startOffset = {startPageXOffset: pageXOffset, startPageYOffset: pageYOffset}
                this.startMouse = {startX: event.x, startY: event.y}

                this.log('mousedown')

                if (event.target.classList.contains('nsc-cropper-border')) {
                    const [, border] = event.target.classList[1].match(/border-(.+)/);
                    this.moveBorder = border;
                } else if (event.target.classList.contains('nsc-cropper-container')) {
                    this.moveBorder = 'container';
                    this.center = {x: event.x, y: event.y, origX: this.points.x, origY: this.points.y}
                } else if (event.target.classList.contains('nsc-cropper-button') || event.target.parentElement.classList.contains('nsc-cropper-button') ||
                    event.target.classList.contains('nsc-cropper-more') || event.target.parentElement.classList.contains('nsc-cropper-more')) {
                    return false
                } else if (event.button === 2) {
                    this.destroy()
                }

                document.onmousemove = ({x, y}) => {
                    this.log('move select')
                    this.mouse = {x, y}

                    this.lens()
                    this.move()
                };

                document.onmouseup = (event) => {
                    this.log('mouseup')
                    this.end()

                    document.onmousemove = ({x, y}) => {
                        this.log('move cursor')

                        this.mouse = {x, y}
                        this.lens()
                    };
                };
            };

            window.onkeydown = (event) => {
                this.log(`keydown ${event.key}`)
                if (event.key === "Escape") {
                    this.destroy()
                }
            };

            document.oncontextmenu = () => {
                this.destroy()
            };

            window.onscroll = (e) => {
                if (this.wrapper && this.options.wrapperFull) {
                    const {width, height} = this.getWrapperSize()

                    this.wrapper.style.width = `${width}px`;
                    this.wrapper.style.height = `${height}px`;
                }
                e.stopImmediatePropagation()
            }
        }

        createButton(type, text, click) {
            const crop_button = document.createElement('div')
            crop_button.className = `nsc-cropper-button nsc-${type}`;
            const crop_button_icon = document.createElement('div')
            crop_button_icon.className = 'nsc-cropper-button-icon';

            crop_button.appendChild(crop_button_icon)

            if (text) {
                const crop_button_text = document.createElement('div')
                crop_button_text.className = 'nsc-cropper-button-text';
                crop_button_text.innerText = text;
                crop_button.appendChild(crop_button_text)
            }

            if (click) {
                crop_button.onclick = () => {
                    if (type !== 'cancel') {
                        this.action(type)
                    }
                    this.destroy()
                };
            }

            return crop_button;
        }

        createElement(name, type) {
            const element = document.createElement(`nsc-cropper-${name}`)
            element.className = `nsc-cropper-${name} ${type ? name + '-' + type : ''}`;

            return element;
        }

        mounted() {
            if (this.wrapper) return;

            const {width, height} = this.getWrapperSize()

            this.wrapper = this.createElement('wrapper')
            this.wrapper.style.width = `${width}px`;
            this.wrapper.style.height = `${height}px`;

            if (!this.options.wrapperFull) {
                const {pageYOffset, pageXOffset} = window;
                this.wrapper.style.top = `${pageYOffset}px`;
                this.wrapper.style.left = `${pageXOffset}px`;
            }

            // this.wrapper.classList.add('start');

            this.outline.top = this.createElement('outline', 'top')
            this.outline.left = this.createElement('outline', 'left')
            this.outline.right = this.createElement('outline', 'right')
            this.outline.bottom = this.createElement('outline', 'bottom')

            this.lens_wrapper = this.createElement('lens-wrapper')
            this.lens_wrapper.style.display = this.options.displayHide;

            const canvas = document.createElement('canvas');
            this.lens_wrapper.appendChild(canvas)

            this.container = this.createElement('container')
            this.container.style.display = this.options.displayHide;
            this.size = this.createElement('size')

            const border = {
                top: this.createElement('border', 'top'),
                topCenter: this.createElement('border', 'top-center'),
                left: this.createElement('border', 'left'),
                right: this.createElement('border', 'right'),
                bottom: this.createElement('border', 'bottom'),
                bottomCenter: this.createElement('border', 'bottom-center'),
                rightTop: this.createElement('border', 'right-top'),
                rightCenter: this.createElement('border', 'right-center'),
                rightBottom: this.createElement('border', 'right-bottom'),
                leftTop: this.createElement('border', 'left-top'),
                leftCenter: this.createElement('border', 'left-center'),
                leftBottom: this.createElement('border', 'left-bottom')
            }

            this.crop_control = this.createElement('buttons')
            // this.crop_control.style.display = this.options.displayHide;
            const crop_edit = this.createButton('edit', chrome.i18n.getMessage("cropBtnEdit"), true)
            const crop_save = this.createButton('download', chrome.i18n.getMessage("cropBtnSave"), true)
            const crop_cancel = this.createButton('cancel', chrome.i18n.getMessage("cropBtnCancel"), true)

            this.crop_more = this.createElement('more')
            // this.crop_more.style.display = this.options.displayHide;
            const more_button = this.createButton('more')
            const more_container = this.createElement('more-container')
            const more_button_nimbus = this.createButton('nimbus', 'Nimbus', true)
            const more_button_slack = this.createButton('slack', chrome.i18n.getMessage("editBtnSlack"), true)
            const more_button_google = this.createButton('google', chrome.i18n.getMessage("editBtnDrive"), true)
            // const more_button_quick = this.createButton('quick', chrome.i18n.getMessage("editBtnQuickUpload"), true)
            const more_button_print = this.createButton('print', chrome.i18n.getMessage("editBtnPrint"), true)
            const more_button_pdf = this.createButton('pdf', chrome.i18n.getMessage("cropBtnSavePdf"), true)

            Object.keys(border).forEach((key) => {
                this.container.appendChild(border[key])
            })

            this.crop_control.appendChild(crop_edit)
            this.crop_control.appendChild(crop_save)
            this.crop_control.appendChild(crop_cancel)

            more_container.appendChild(more_button_nimbus)
            more_container.appendChild(more_button_slack)
            more_container.appendChild(more_button_google)
            // more_container.appendChild(more_button_quick)
            more_container.appendChild(more_button_print)
            more_container.appendChild(more_button_pdf)
            if (window.nimbus_core.is_firefox) {
                const more_button_copy = this.createButton('copy_to_clipboard', chrome.i18n.getMessage("cropBtnCopy"), this.copy)
                more_container.appendChild(more_button_copy)
            }

            this.crop_more.appendChild(more_button)
            this.crop_more.appendChild(more_container)

            this.container.appendChild(this.crop_control)
            this.container.appendChild(this.crop_more)
            this.container.appendChild(this.size)

            this.wrapper.appendChild(this.outline.top)
            this.wrapper.appendChild(this.outline.left)
            this.wrapper.appendChild(this.outline.right)
            this.wrapper.appendChild(this.outline.bottom)
            this.wrapper.appendChild(this.container)

            // document.body.appendChild(this.wrapper)
            // document.body.appendChild(this.lens_wrapper)

            document.documentElement.appendChild(this.wrapper)
            document.documentElement.appendChild(this.lens_wrapper)

            this.event();
        }

        render() {
            const {w, h, x, y} = this.getPoints();
            const {offsetWidth, offsetHeight} = this.wrapper;
            const top = parseInt(this.wrapper.style.top) || 0;
            const left = parseInt(this.wrapper.style.left) || 0;

            if (this.points.y < 0) {
                return;
            }
            if (this.points.x < 0) {
                return;
            }
            if (this.points.y + this.points.h > offsetHeight + top) {
                return;
            }
            if (this.points.x + this.points.w > offsetWidth + left) {
                return;
            }

            this.container.style.display = this.options.displayShow;

            this.container.style.top = `${y - top}px`;
            this.container.style.left = `${x - left}px`;
            this.container.style.width = `${w}px`;
            this.container.style.height = `${h}px`;

            this.renderOutline()
            this.renderControl()
        }

        renderOutline() {
            const {w, h, x, y} = this.getPoints();
            const {offsetWidth, offsetHeight} = this.wrapper;
            const top = parseInt(this.wrapper.style.top) || 0;
            const left = parseInt(this.wrapper.style.left) || 0;

            this.outline.top.style.height = `${y - top}px`;
            this.outline.left.style.top = `${y - top}px`;
            this.outline.left.style.width = `${x - left}px`;
            this.outline.left.style.height = `${h}px`;
            this.outline.right.style.top = `${y - top}px`;
            this.outline.right.style.height = `${h}px`;
            this.outline.right.style.width = `${offsetWidth - w - x - left}px`;
            this.outline.bottom.style.top = `${h + y - top}px`;
            this.outline.bottom.style.height = `${offsetHeight - h - y + top}px`;
        }

        renderControl() {
            const {w, h, x, y} = this.getPoints();
            const {offsetHeight} = this.wrapper;

            if (h + y + 80 > offsetHeight) {
                this.crop_control.classList.add('inside');
            } else {
                this.crop_control.classList.remove('inside');
            }

            if (w < 350 || h + y + 80 > offsetHeight) {
                this.crop_more.classList.add('inside');
            } else {
                this.crop_more.classList.remove('inside');
            }

            if (y < 30) {
                this.size.classList.add('inside');
            } else {
                this.size.classList.remove('inside');
            }

            this.size.innerText = `${w} x ${h}`;
        }

        destroy() {
            this.wrapper && this.wrapper.remove();
            this.lens_wrapper && this.lens_wrapper.remove();
            this.wrapper = null;
            this.lens_wrapper = null;
            this.container = null;

            this.image = null;

            this.outline = {
                top: null,
                left: null,
                right: null,
                bottom: null
            };
            this.points = {
                x: 0,
                y: 0,
                w: 0,
                h: 0
            }

            this.mouse = {
                x: 0,
                y: 0
            }

            document.onmousedown = null;
            document.onmousemove = null;
            document.onmouseup = null;
            window.onscroll = null;

            // (async () => {
            //     window.removeEventListener('wheel', (e) => {
            //         e.preventDefault()
            //     }, await this.preventDefaultWheel());
            //
            //     window.removeEventListener('keydown', this.preventDefaultForScrollKeys, false);
            // })()
        }

        move() {
            this.container.classList.add('move')

            const {x, y} = this.mouse;
            const {pageYOffset, pageXOffset} = window;
            const top = parseInt(this.wrapper.style.top) || 0;
            const left = parseInt(this.wrapper.style.left) || 0;

            if (this.moveBorder) {
                let points = {
                    ...this.points
                }

                if (this.moveBorder.includes('top')) {
                    if (this.options.scrollEnable) {
                        points.y = this.points.y + (y + pageYOffset - this.points.y);
                        points.h = this.points.h - (y + pageYOffset - (this.points.y - top));
                    } else {
                        points.y = this.points.y + (y + pageYOffset - this.points.y);
                        points.h = this.points.h - (y - (this.points.y - top));
                    }
                }
                if (this.moveBorder.includes('bottom')) {
                    points.h = this.points.h + (y + pageYOffset - (this.points.y + this.points.h));
                }
                if (this.moveBorder.includes('right')) {
                    points.w = this.points.w + (x + pageXOffset - (this.points.x + this.points.w));
                }
                if (this.moveBorder.includes('left')) {
                    points.x = this.points.x + (x + pageXOffset - this.points.x);
                    points.w = this.points.w - (x + pageXOffset - (this.points.x - left));
                }
                if (this.moveBorder.includes('container')) {
                    points.x = this.center.origX + (x - this.center.x)
                    points.y = this.center.origY + (y - this.center.y)
                }
                this.points = {...points};
            } else {
                const {startX, startY} = this.startMouse;
                const {startPageXOffset, startPageYOffset} = this.startOffset;

                const w = x + pageXOffset - this.points.x;
                const h = y + pageYOffset - this.points.y;

                if (this.options.scrollEnable) {
                    this.points = {...this.points, w, h, x: startX + startPageXOffset, y: startY + startPageYOffset};
                } else {
                    this.points = {...this.points, w, h, x: startX + pageXOffset, y: startY + pageYOffset};
                }
            }

            this.render()
            clearTimeout(this.timerScroll);
            this.scroll({x, y, pageXOffset, pageYOffset})
        }

        end() {
            this.container.classList.remove('move')

            this.moveBorder = null;
            this.mouse = {
                x: 0,
                y: 0
            }

            clearTimeout(this.timerScroll);

            if (this.points.h < 0 || this.points.x < 0) {
                if (this.points.h < 0) {
                    this.points = {...this.points, h: -(this.points.h), y: this.points.y + this.points.h}
                } else {
                    this.points = {...this.points, w: -(this.points.w), x: this.points.x + this.points.w}
                }
                this.render()
            }
        }

        scroll({x, y, pageXOffset, pageYOffset}) {
            if (!this.options.scrollEnable) return;

            clearTimeout(this.timerScroll);

            const {innerHeight, innerWidth} = window;
            const topShift = (y + 100 - innerHeight) / 2;
            const leftShift = (x + 100 - innerWidth) / 2;
            const yShift = topShift < 0 ? 0 : topShift;
            const xShift = leftShift < 0 ? 0 : leftShift;

            if (yShift > 0 || xShift > 0) {
                document.documentElement.scrollTop += yShift;
                document.documentElement.scrollLeft += xShift;

                const {w, h} = this.points;
                const {scrollTop, scrollLeft} = document.documentElement;
                const addW = (scrollTop - pageYOffset);
                const addH = (scrollLeft - pageXOffset);

                this.points = {...this.points, h: h + addW};
                this.points = {...this.points, w: w + addH};

                this.render();

                this.timerScroll = window.setTimeout(() => {
                    this.scroll({
                        x,
                        y,
                        pageXOffset: scrollLeft,
                        pageYOffset: scrollTop
                    })
                }, 25)
            }
        }

        lens() {
            if (!this.image) {
                return;
            }

            this.lens_wrapper.style.display = this.options.displayShow;
            const {x, y} = this.mouse;
            const [canvas] = this.lens_wrapper.getElementsByTagName('canvas')
            const context = canvas.getContext('2d');
            const zoom = 8;
            const w = 30;
            const h = 30;
            const wZ = w * zoom;
            const hZ = h * zoom;
            context.canvas.width = wZ;
            context.canvas.height = hZ;

            context.drawImage(this.image, x - w / 2, y - w / 2, w, h, 0, 0, wZ, hZ);
            context.lineWidth = 1;
            context.strokeStyle = "#000000";
            context.beginPath();
            context.moveTo(120, 0);
            context.lineTo(120, wZ);
            context.moveTo(0, 120);
            context.lineTo(hZ, 120);
            context.stroke();

            if (x < wZ + wZ && y < hZ + hZ) {
                this.lens_wrapper.classList.add('right');
            } else {
                this.lens_wrapper.classList.remove('right');
            }
        }

        action() {
        }

        on() {
            const onArgs = Array.prototype.slice.call(arguments);
            const originalFunction = this[onArgs[0]];
            const givenCallback = onArgs[1];

            this[onArgs[0]] = function () {
                const args = Array.prototype.slice.call(arguments);
                givenCallback.apply(this, args);
                originalFunction.apply(this, args);
            }
        }

        show() {
            this.wrapper.style.display = this.options.displayShow;
        }

        hide() {
            this.wrapper.style.display = this.options.displayHide;
        }

        getWrapperSize() {
            if (!this.options.wrapperFull) {
                const {innerHeight, innerWidth} = window;
                return {
                    height: innerHeight,
                    width: innerWidth
                }
            }

            const maxSize = 32767;
            const maxArea = 268435456;
            const {
                scrollHeight,
                offsetHeight,
                clientHeight,
                scrollWidth,
                offsetWidth,
                clientWidth,
            } = document.documentElement;
            const height = Math.ceil(Math.min(maxSize, Math.max(scrollHeight, offsetHeight, clientHeight)))
            const width = Math.ceil(Math.min(maxSize, Math.max(scrollWidth, offsetWidth, clientWidth)))

            if (width * height > maxArea) {
                return {
                    height: Math.floor(maxArea / width),
                    width
                }
            }

            return {
                height,
                width
            }
        }

        setPoints({x, y, w, h}) {
            this.log(`setPoints ${x} ${y} ${w} ${h}`)
            this.points = {x, y, w, h}
        }

        getPoints() {
            return {
                w: this.points.w < 0 ? -(this.points.w) : this.points.w,
                h: this.points.h < 0 ? -(this.points.h) : this.points.h,
                x: this.points.w < 0 ? this.points.x + this.points.w : this.points.x,
                y: this.points.h < 0 ? this.points.y + this.points.h : this.points.y
            }
        }

        getFinishPoints() {
            if (!this.options.wrapperFull) {
                const top = parseInt(this.wrapper.style.top) || 0;
                const left = parseInt(this.wrapper.style.left) || 0;

                return {
                    ...this.getPoints(),
                    x: (this.points.w < 0 ? this.points.x + this.points.w : this.points.x) - left,
                    y: (this.points.h < 0 ? this.points.y + this.points.h : this.points.y) - top
                }
            }

            return this.getPoints()
        }
    }

    window.nscCropper = new nscCropperCore();
})()

