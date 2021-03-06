import {defineComponent, ref, computed, watch} from 'vue'
import Num from '../../number'
import Choose from '../../choose'
import Item from '../../item'
import Bouton from '../../bouton'
const Option = Item as any
export default defineComponent({
    name: 'Pagination',
    components: {Num,Choose,Option,Bouton},
    props: {
        total: {
            type: Number,default: 0
        },
        pageIndex: {type: Number,default: 1},
        pageSize: {type: Number,default: 20},
        sizes: {type: Array,default: ()=>[20,50,80,100,200]},
        align: {type: String,default: 'right'},//left,center,right
        layout: {
            type: String,
            default: 'total,prev,pager,next,sizes,jumper'
        },
        sizesPlacement: {type: String,default: 'bottom-start'},
        hideWhenNoData: Boolean
    },
    emits: [
        "update:pageIndex",
        "update:pageSize",
        "changePageIndex",
        "changePageSize"
    ],
    setup(props,{emit,attrs,slots}) {
        const dot = ref('...')
        const outsize = ref(10)
        const max = ref(5)
        const max2 = ref(7)
        const pi = ref(props.pageIndex)
        const ps = ref(props.pageSize)
        const p_number = ref()
        const lout = computed(()=>props.layout.toLocaleLowerCase().split(','))
        const totalPages = computed(()=>Math.ceil(props.total/ps.value))
        const pagers = computed(()=>{
            //无论总页数多少，第一页和最后一页总是要展示
            const t = totalPages.value,
            oz = outsize.value,
            v_max = max.value,
            v_max2 = max2.value,
            p = pi.value, //当前页码
            v_dot = dot.value
            if (t > oz) {
                let arr = []
                if (t - p >= v_max && p > v_max) {
                    for (let i = p - 2; i <= p + 2; i++) {
                        arr.push(i)
                    }
                    arr.push(v_dot, t)
                    arr.unshift(1, v_dot)
                } else {
                    if (p <= v_max) {
                        for (let i = 1; i <= v_max2; i++) {
                            arr.push(i)
                        }
                        arr.push(v_dot, t)
                    } else if (t - p < v_max) {
                        for (let i = t; i > t - v_max2; i--) {
                            arr.unshift(i)
                        }
                        arr.unshift(1, v_dot)
                    }
                }
                return arr
            } else {
                //@ts-ignore
                return Array.apply(null,{length:t}).map((el,i)=>i+1)
            }
        })
        const chooseProps = computed(()=>{
            const o:any = {
                toBody: false,
                bind: 'v-show',
                style: {width: '8em'},
                modelValue: ps.value,
                'onUpdate:modelValue':(size:number)=>{
                    ps.value = size
                    pi.value = 1
                    emit('update:pageSize',size)
                    emit('changePageSize',size)
                    changePage()
                }
            }
            return o
        })
        const numProps = computed(()=>({
            placement: 'top',
            validate: {
                when:'input',
                reg: /\d+/
            },
            showTip: false,
            modelValue: p_number.value,
            'onUpdate:modelValue':(p:any)=>{
                p_number.value = p
            },
            'onChange':(e:any)=> {
                // const target = e.target
                let v = parseInt(p_number.value)
                if(isNaN(v)) {
                    p_number.value = ''
                }else{
                    p_number.value = v
                }
            },
            'onKeyup':(e:KeyboardEvent)=>{
                if(e.key.toLowerCase()==='enter') {
                    toJump()
                }
            },
            // 'onChange':(p:any)=>{
            //     console.log(p)
            // },
            style: {width:'54px'}
        }))

        watch(()=>[
            props.pageIndex,
            props.pageSize
        ],([i,s])=>{
            pi.value = i
            ps.value  = s
        })
        watch(pi,v=>{
            emit('update:pageIndex',v)
        })
        watch(ps,v=>{
            emit('update:pageSize',v)
        })

        function toJump() {
            const p = p_number.value - 0
            if(isNaN(p)) {return}
            if(p<1 || p> totalPages.value) {return}
            if(p!==pi.value) {
                pi.value = p
                changePage()
            }
        }

        function toNext() {
            if(pi.value<totalPages.value) {
                pi.value += 1
                changePage()
            }
        }

        function toPrev() {
            if(pi.value>1) {
                pi.value -=1
                changePage()
            }
        }

        function changePage() {
            emit('changePageIndex', pi.value)
        }

        function showItem(item:string) {
            return lout.value.indexOf(item)>-1
        }

        function setOrder(item:string) {
            return lout.value.indexOf(item)
        }

        return ()=> {
            const chooseSlots = {
                default:()=>{
                    return props.sizes.map(s=>{
                        const label = `${s}条/页`
                        const itemSlots = {
                            default: ()=> {
                                return label
                            }
                        }
                        const itemProps = {
                            key: s,
                            label,
                            value:s
                        }
                        return <Option {...itemProps} v-slots={itemSlots} />
                    })
                }
            }
            let goProps = {
                onClick:toJump
            }
            let goSlots={
                default: ()=>'Go'
            }
            let btn = <Bouton {...goProps} v-slots={goSlots}></Bouton>

            const all_pages = (pagers.value as any).map((p:any,i:number)=>{
                const isDisabled = p===dot.value
                const ps = {
                    class: {
                        'k-pagination--disabled': isDisabled,
                        'k-pagination--active': p===pi.value
                    },
                    onClick:()=>{
                        if(!isDisabled && pi.value!==p) {
                            pi.value = p
                            changePage()
                        }
                    }
                }
                return (
                    <span {...ps}>{p}</span>
                )
            })

            if(props.total == 0) {
                return null
            }

            return (
                <ol class={["k-pagination",`k-pagination__${props.align}`]}>
                    {showItem('total') && <li class="k-pagination-total"
                        style={{order:setOrder('total')}}>共 {props.total} 条</li>}
                    <li class="k-pagination-pager" style={{order:setOrder('pager')}}>
                        {showItem('prev') && <span class={["k-pagination-prev",{['k-pagination--disabled']:pi.value===1}]}
                            onClick={toPrev}></span>}
                        {showItem('pager') && all_pages}
                        {showItem('next') && <span class={["k-pagination-next",{['k-pagination--disabled']:pi.value===totalPages.value}]}
                            onClick={toNext}></span>}
                    </li>
                    {showItem('sizes') && <li class="k-pagination-sizes" style={{order:setOrder('sizes')}}>
                        <Choose {...chooseProps.value} v-slots={chooseSlots} />
                    </li>}
                    {showItem('jumper') && [<li style={{order:setOrder('jumper')}}>
                        <span>前往 </span>
                        <Num {...numProps.value} />
                        <span> 页</span>
                    </li>,
                    <li class="k-pagination-go" style={{order:setOrder('jumper')}}>
                        {btn}
                    </li>]}
                </ol>
            )
        }
    }
})