
<script lang="jsx">
import { ref, defineComponent, computed, reactive, watch, onMounted } from "vue"
import Button from "@/packages/button"
import Toggle from "@/packages/toggle"
import Checkbox from "@/packages/checkbox"

export default defineComponent({
  components: {
    Toggle,
    Button,
    Checkbox,
  },
  setup(props, ctx) {
    
    return () => (
      <>
        <h1>Toggle</h1>
        <section>
          
        </section>
      </>
    )
  },
})
</script>