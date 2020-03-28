import { action, observable } from "mobx";
import { GET, POST } from '../../api/fetch'

class Carousel {

    @observable datasource: Array<{
        id: number
    }> = []
    @observable loading = false
    @observable visible = false
    @observable detailVisible = false

    @action.bound
    async findMserchant() {
        this.loading = true
        const res = await GET(`/merchant`)
        if (res.code === 0) {
            this.datasource = res.data

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
    async createMserchant(data?) {
        this.loading = true
        const res = await POST(`/merchant`, data)
        if (res.code === 0) {
            this.findMserchant()
        }
        this.loading = false
    }
}
export default new Carousel()