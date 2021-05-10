import {computed, defineComponent, getCurrentInstance, onMounted, ref} from 'vue'
import Write from '../../write'
import Icon from '../../icon'
const OnlyOnce = ['-','.']
const OtherKeys = ['backspace','delete','tab']
export default defineComponent({
    name: 'Number',
    inheritAttrs:false,
    components: {Write,Icon},
    emits: ["update:modelValue",'change','input'],
    props: {
        ...Write.props,
        min: {type: Number,default: undefined},
        max: {type: Number, default: undefined},
        lazy: Boolean,//true：change时进行数据双向同步。false时，input时同步
    },
    setup(props,{emit,attrs,slots}) {
        const writeProps = computed(()=>{
            console.log(props)
            const o:any = {
                placement: props.placement,
                toBody: props.toBody,
                //---------
                block: props.block,
                simple: props.simple,
                modelValue: props.modelValue,
                readonly: props.readonly,
                disabled: props.disabled,
                placeholder: props.placeholder,
                maxlength:props.maxlength,
                type: 'text',
                //由于是只能输入数字的输入框，所以在keydown的时候，做初步的筛选，只允许数值相关的字符录入
                onKeydown:(e:any)=>{
                    const key = e.key.toLowerCase()
                    if(!(/\d+/.test(key)) 
                        && OtherKeys.indexOf(key)===-1 
                        && OnlyOnce.indexOf(key)===-1) {
                        e.preventDefault()
                    }
                },
                //在input时，做进一步的筛选
                onInput:(e:any)=> {
                    let v = e.target.value
                    let _v = v
                    if(_v==='') {
                        if(!props.lazy) {
                            emit('update:modelValue',_v)
                        }
                        return
                    }
                    let firstChar = v.charAt(0)
                    let restChars = v.slice(1)
                    let _rest = restChars
                    //如果首位是点，则后续不能再出现点
                    if(firstChar==='.' || firstChar === '-') {
                        _rest = restChars.replace(new RegExp(firstChar),'')
                    }
                    if(_rest!==restChars) {
                        _v = firstChar + _rest
                    }
                    if(v!==_v) {
                        v=_v
                        e.target.value=_v
                    }
                    v = Number(v)
                    if(isNaN(v)) {
                        console.warn(`${v}不是一个数？`)
                    }else{
                        if(!props.lazy) {
                            toValidateAndEmit('input',e,v)
                            emit('input',e)
                        }
                    }
                },
                //change时，做第三次的数值规范
                onChange:(e:any) => {
                    let v = e.target.value
                    let _v = v
                    let firstChar = v.charAt(0)
                    let twoChar = v.slice(0,2)
                    
                    if(firstChar==='.') {
                        _v = '0.' + v.slice(1)
                    }else if(twoChar==='-.') {
                        _v = '-0.'+v.slice(2)
                    }
                    if(v!==_v) {
                        v=_v
                        e.target.value = _v
                    }
                    v = Number(v)
                    if(isNaN(v)) {
                        console.warn(`${v}不是一个数？`)
                    }else{
                        if(props.lazy) {
                           toValidateAndEmit('change',e,v)
                           emit('change',e)
                        }
                    }
                }
            }
            
            return o
        })

        function toValidateAndEmit(when:string,e:any, v:number) {
            const min = props.min, max = props.max
            e.target.value = v
            emit('update:modelValue',v)
        }

        return ()=>{
            const _slots = {
                append:()=>([
                    <i class="k-number-minus-icon"  />,
                    <i class="k-number-plus-icon"  />
                ])
            }
            return (
                <Write {...writeProps.value} v-slots={_slots} />
            )
        }
    }
})