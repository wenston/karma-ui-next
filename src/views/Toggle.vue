
<script lang="jsx">
import { ref, defineComponent, computed, reactive, watch, onMounted } from "vue"
import Button from "../packages/components/button"
import Checkbox from "../packages/components/checkbox"

export default defineComponent({
  components: {
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