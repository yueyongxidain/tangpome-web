import * as _ from 'lodash'
import { action, observable } from "mobx";
import { DELETE, GET ,POST} from '../../api/fetch'

class Carousel {

    @observable datasource: Array<{
        id: number
    }> = []
    @observable loading = false
    @observable visible = false
    @observable current: { [key: string]: string | number } = undefined

    async findGoods() {
        this.loading = true
        const res = await GET(`/childrenSong`)
        if (res.code === 0) {
            this.datasource = res.data

        }
        this.loading = false
    }

    @action.bound
    save(data) {
        Object.keys(data).map((ele) => {
            this[ele] = _.cloneDeep(data[ele])
        })
        // tslint:disable-next-line: no-console
        console.log(this.visible)
    }

    @action.bound
    async upset(data?) {
        this.loading = true
        const res = await POST(`/goods`, data)
        if (res.code === 0) {
            this.findGoods()
        }
        this.loading = false
    }

    async create(data) {
        const res = await POST(`/childrenSong`, data)
        if (res.code === 0) {
            this.findGoods()
        }
    }
    @action.bound
    async delete(id:number) {
        this.loading = true
        const res = await DELETE(`/childrenSong/${id}`)
        if (res.code === 0) {
            this.findGoods()
        }
    }

}
export default new Carousel()