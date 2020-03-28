import { action, observable } from "mobx";
import { GET, POST } from '../../api/fetch'

class Carousel {

    @observable datasource: Array<{
        id: number
    }> = []
    @observable loading = false
    @observable visible = false

    @action.bound
    async findCarousel() {
        this.loading = true
        const res = await GET(`/carousel`)
        // tslint:disable-next-line: no-console
        if (res.code === 0) {
            this.datasource = res.data
            // tslint:disable-next-line: no-console
            console.log(res.data)
        }
        this.loading = false
    }
    @action.bound
    save(data) {
        Object.keys(data).map((ele) => {
            this[ele] = data[ele]
        })
    }
    @action.bound
    async upset(data?) {
        this.loading = true
        const res = await POST(`/carousel/`, data)
        if (res.code === 0) {
            this.findCarousel()
        }
        this.loading = false
    }
}
export default new Carousel()