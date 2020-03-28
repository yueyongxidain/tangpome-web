import { action, observable } from "mobx";
import { GET } from '../../api/fetch'
class User {
    namespace = 'user'

    @observable datasource = []
    @observable loading = false
    @observable pageNum = 1
    @observable pageSize = 10
    @observable total = 0
    @observable where = {}

    @action.bound
    async findUser(parasm) {
        this.loading = true
        const res = await GET(`/user/${parasm.pageNum}/${parasm.pageSize}`, parasm.where)
        if (res.code === 0) {
            this.pageNum = parasm.pageNum
            this.where = parasm.where
            this.total = res.total
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
}
export default new User()