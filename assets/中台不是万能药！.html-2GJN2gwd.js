import{_ as o}from"./10-4-DngEJlnM.js";import{_ as t}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as p,a as r,o as a}from"./app-NomDibRt.js";const n={};function c(i,e){return a(),p("div",null,e[0]||(e[0]=[r('<h1 id="中台也不是万能的" tabindex="-1"><a class="header-anchor" href="#中台也不是万能的"><span>中台也不是万能的...</span></a></h1><blockquote><p>作者：老马<br><br>公众号：老马啸西风<br><br> 博客：<a href="https://houbb.github.io/" target="_blank" rel="noopener noreferrer">https://houbb.github.io/</a><br><br> 人生理念：知行合一</p></blockquote><p>大家好，我是老马~</p><p>今天跟大家聊聊下中台，欢迎留言讨论</p><p>中台最早是由阿里巴巴推动在国内火起来的，早在2015年，马云带领阿里多位高管拜访芬兰著名的游戏公司Supercell，看到平均一款游戏落地只需要5~7人，被这种高效工作模式触动。</p><p>于是，开始在公司内部尝试“大中台，小前台”的架构模式，诞生了阿里巴巴中台战略。</p><p>经过15、16两年的时间孕育，在2017年，中台的声音越来越大，很多大厂开始开始搞中台建设，市面上关于中台建设的分享经验也多了起来。</p><p>中台极大的释放了企业创新和变革的能力，像阿里的盒马、钉钉都是阿里中台创新的成果。</p><p>18年、19年可谓是中台发展元年，很多中小厂、传统企业也参与进来搞中台建设，仿佛一个公司不搞中台，没有中台，都不好意说自己是个互联网技术公司。</p><p>潮流引领人，有时也误导人。</p><p>中台建设耗时耗力，很多公司的程序员苦不堪言，既要应对正常的业务迭代，还需要抽时间搞中台架构升级。</p><h2 id="讲了这么多了-可能有同学要问了-那什么是中台" tabindex="-1"><a class="header-anchor" href="#讲了这么多了-可能有同学要问了-那什么是中台"><span>讲了这么多了，可能有同学要问了，那什么是中台？</span></a></h2><blockquote><p>中台是<code>企业级能力复用平台</code>。 抽象核心的底层能力，平台化包装，快速赋能前台业务。通过底层的确定性来应对前台业务的不确定性。</p></blockquote><p><strong>可能有同学会问，平台化和中台化有什么区别？</strong></p><p><code>关于这个问题，ThoughtWorks首席咨询师王健老师给出了很好的解释！</code></p><blockquote><p>中台化是平台化的下一站，是平台不断对于自身治理演进、打破技术边界、逐渐拥抱业务、容纳业务、具备更强的业务属性的过程。中台关注为前台业务赋能，真正为前台而生。</p></blockquote><p>划重点：中台的诞生就是为了更好的服务前台，如果前台业务单一，或业务逻辑并不复杂，其实没必要花那么大的精力搞中台建设，得不偿失。</p><h2 id="前台、中台、后台的定位分别是什么" tabindex="-1"><a class="header-anchor" href="#前台、中台、后台的定位分别是什么"><span>前台、中台、后台的定位分别是什么？</span></a></h2><ul><li>前台：直接面向用户，讲究的轻量化、灵活多变、快速响应、快速上线</li><li>中台：直接为前台提供服务，讲究的核心能力抽象、配置化、稳定、以不变应万变</li><li>后台：主要负责企业的核心数据，设计企业安全、审计、合规等法律限制，对稳定性、安全性有较高要求。</li></ul><h2 id="如何建设中台" tabindex="-1"><a class="header-anchor" href="#如何建设中台"><span>如何建设中台？</span></a></h2><p>中台建设没有固定模板，不同公司的设计方案也是千差万别。把控一点，能快速响应前台业务需求。一般企业会设计类似流程引擎这种支持通过<code>界面拖拽</code>的方式，来配置不同的业务流程。</p><div align="left"><img src="'+o+'" width="650px"></div><p>平台提供了若干基础组件功能，定义好每个组件的规范、输入、输出，不同业务流程通过选择不同模块来编排自己的业务流程，从而快速满足业务需求。</p><p>对变化频繁的接口，我们会设计<code>SPI接口</code>，支持业务方<code>自定义代码实现</code>，<code>动态加载</code>到我们的平台，然后由平台统一调度请求。</p><p>当然不同人开发的接口性能也不太一样，发布前除了要做性能压测外，我们还会提供一些基础服务治理功能，比如：<code>接口超时处理</code>、<code>重试机制</code>、<code>流量控制</code>、<code>降级</code>、<code>熔断</code>等稳定性方案，保障系统的高可用。</p><h2 id="中台建设可能遇到的问题" tabindex="-1"><a class="header-anchor" href="#中台建设可能遇到的问题"><span>中台建设可能遇到的问题？</span></a></h2><p>任何事情都不会是一帆风顺，搭建中台也会遇到很多问题，遇到最多的就是，这个功能到底是由中台来做，还是由业务研发来做？</p><p>这个很容易导致中台部门和业务部门之间的扯皮，严重影响业务的落地速度。这就需要一个强有力、善于跨部门沟通的中台负责人，对该业务领域有丰富的业务经验，能从技术视角预测未来的业务走势，从而对功能归属做出定位判断，再结合强有力的沟通，推动该事情落地。</p><p>当然，这个结论是否正确，还需要漫长的时间验证，长时间的正确决策会慢慢巩固你的中台权威，形成正向循环。</p><p>中台建设是一个自上而下的过程，大家是一个集体，一荣俱荣，千万不能有小帮派思想，一盘散沙很难成事，这个需要总负责人在公司有很高的话语权。甚至把中台建设设定成公司的战略，跟业务有着对等的地位。</p><p>当然也不是所有的公司都要搞中台建设，如果公司的业务线不超过三条，或者各业务线的通用模块并不多，最好不要搞中台建设。中台建设是业务发展到一定阶段的自然产物，当投入和产出严重失衡时，我们便可以从中台视角，通过技术手段对其优化，降低公司成本。</p><h2 id="中台小故事" tabindex="-1"><a class="header-anchor" href="#中台小故事"><span>中台小故事</span></a></h2><p>当然，我们也要注意一个点，中台的产品要如何规划，有些小公司想搞中台建设，可是产品人员不足。于是中台的产品经理便由前台业务产品经理来兼任。</p><p>前台产品经理一般直面客户，要求快速响应客户需求，这些需求通常都是<code>多变性</code>，很多甚至带有业务<code>探索性质</code>，对<code>创新性</code>要求很高。</p><p>而中台产品经理更多是为前台技术团队提供服务，讲究<code>抽象能力</code>、<code>共享</code>、<code>降低企业管理成本</code>，将一些稳定的逻辑沉淀到中台，节奏肯定很慢。</p><p>如果将两者放到一个人身上，就好比要求一个人既要走的很快，甚至要跑起来，又要走得优雅，走出美的感觉，有种自相矛盾。</p><p>所以，我们做人员组织架构安排时，还是要慎重些，该投入的成本一定要舍得。既想要中台的高产能力，又想节省成本，不舍得应有的技术投入，这不是天方夜谭，最后只会竹篮打水一场空。</p><p>中台更多适合在一些<code>高确定性</code>、<code>高通用性</code>的场景下孵化建设，这样更利于发挥其最大价值。</p><h2 id="摆正心态" tabindex="-1"><a class="header-anchor" href="#摆正心态"><span>摆正心态</span></a></h2><p>由于中台的自身属性决定，收编前台核心逻辑，有点<code>江湖大哥</code>的味道，中台的开发同学一定要摆正自己的工作态度，千万不要以平台建设稳定、较长研发排期等理由搪塞前台业务同学，很容易遭到业务研发的不满和投诉，毕竟客户就是上帝。</p><p>另外，本着<code>简单就是最优的原则</code>，不是所有的业务都要接入中台，一些简单的功能可能会被中台的复杂规则带偏节奏，人为的将其复杂化，从而加长开发工期。我们的目标是尽快落地，而不是接入中台。一定要保持清醒的头脑，不要盲从。</p><h2 id="中台不是万能药" tabindex="-1"><a class="header-anchor" href="#中台不是万能药"><span>中台不是万能药</span></a></h2><p>由于中台的高复用能力，很多人会有种错觉，感觉中台无所不能，全是优点。</p><p>殊不知，任何系统都不天生完美的，一个成熟的中台也需要日积月累的打磨、优化，这些都需要资源。</p><p>很多创新业务，如果能直接对接进中台还好一点，如果涉及中台技术改造，那可能就要走排期。由于创新业务失败的风险极高，竞争中台资源排期时，不如一些较成熟的业务有优势。</p><p>较慢的项目排期，又无法保证创新业务的快速试错，恶性循环。如果操作不当，中台甚至可能会扼杀一些创新业务的崛起，使公司错失一些优秀产品。</p><p>创新分为<code>颠覆式创新</code>、<code>组合式创新</code>。中台产品一定要灵活，深入思考如何服务好业务研发，服务好产品创新。快速接入、延缓接入、早期甚至由业务团队自建，关键一个字要 “快”。</p><h2 id="谈谈未来" tabindex="-1"><a class="header-anchor" href="#谈谈未来"><span>谈谈未来</span></a></h2><p>最近几年，中台的热度开始下降，去年圈内有关中台的一件事传的非常火爆，阿里CE0张勇在阿里内网发布文章，表示目前阿里的中台并不满意，他直言道，现在阿里的业务发展太慢，要把中台变薄，变得敏捷和快速。</p><p>那是不是中台就要<code>凉了</code>？个人觉的应该不会。</p><p>中台的位置偏底层，投入成本巨大，很难像业务直接看到收益，老板们有焦虑心态也是可以理解。但中台的价值也是不容小觑，当然中台与前台的边界博弈也一直存在。</p><p>如何做到两者的平衡是很多公司在探索的事情，正如历史所言，“天下大事分久必合，合久必分”，中台也是一样，不断的优化。</p><p>未来，中台会<code>越来越薄</code>，越来越<code>碎片化</code>。甚至可能换个名称，不再叫“中台”，但是他的价值却始终是我们要追寻保留的。</p><h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料"><span>参考资料</span></a></h2><ul><li><a href="https://time.geekbang.org/column/article/140065" target="_blank" rel="noopener noreferrer">03 | 中台定义：当我们谈中台时到底在谈些什么？</a></li><li><a href="https://blog.csdn.net/hanxiaolaa/article/details/114110951" target="_blank" rel="noopener noreferrer">郭东白：《从中台技术谈架构师的独立思考能力》</a></li><li><a href="https://mp.weixin.qq.com/s/5bh-kFIx71yOpfYmwsXIOg" target="_blank" rel="noopener noreferrer">做中台2年多了，中台到底是什么呢？万字长文来聊一聊中台</a></li><li><a href="http://www.woshipm.com/it/4325165.html" target="_blank" rel="noopener noreferrer">不要慌！阿里不会“拆”中台</a></li><li><a href="https://www.huxiu.com/article/362363.html" target="_blank" rel="noopener noreferrer">BAT都在悄悄“拆”中台，“碎片化中台” 时代已来</a></li><li><a href="https://finance.sina.com.cn/chanjing/gsnews/2020-12-23/doc-iiznezxs8527037.shtml" target="_blank" rel="noopener noreferrer">阿里彻底拆中台了</a></li></ul>',55)]))}const l=t(n,[["render",c]]),b=JSON.parse('{"path":"/posts/interview/arch/system/%E4%B8%AD%E5%8F%B0%E4%B8%8D%E6%98%AF%E4%B8%87%E8%83%BD%E8%8D%AF%EF%BC%81.html","title":"中台也不是万能的...","lang":"zh-CN","frontmatter":{"title":"中台也不是万能的...","description":"中台也不是万能的... 作者：老马 公众号：老马啸西风 博客：https://houbb.github.io/ 人生理念：知行合一 大家好，我是老马~ 今天跟大家聊聊下中台，欢迎留言讨论 中台最早是由阿里巴巴推动在国内火起来的，早在2015年，马云带领阿里多位高管拜访芬兰著名的游戏公司Supercell，看到平均一款游戏落地只需要5~7人，被这种高效工...","head":[["meta",{"property":"og:url","content":"https://houbb.github.io/vpress/posts/interview/arch/system/%E4%B8%AD%E5%8F%B0%E4%B8%8D%E6%98%AF%E4%B8%87%E8%83%BD%E8%8D%AF%EF%BC%81.html"}],["meta",{"property":"og:site_name","content":"老马啸西风"}],["meta",{"property":"og:title","content":"中台也不是万能的..."}],["meta",{"property":"og:description","content":"中台也不是万能的... 作者：老马 公众号：老马啸西风 博客：https://houbb.github.io/ 人生理念：知行合一 大家好，我是老马~ 今天跟大家聊聊下中台，欢迎留言讨论 中台最早是由阿里巴巴推动在国内火起来的，早在2015年，马云带领阿里多位高管拜访芬兰著名的游戏公司Supercell，看到平均一款游戏落地只需要5~7人，被这种高效工..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-03-30T09:38:40.000Z"}],["meta",{"property":"article:modified_time","content":"2025-03-30T09:38:40.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"中台也不是万能的...\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-03-30T09:38:40.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"老马啸西风\\",\\"url\\":\\"https://houbb.github.io\\"}]}"]]},"git":{"createdTime":1743327520000,"updatedTime":1743327520000,"contributors":[{"name":"houbb","username":"houbb","email":"houbinbin.echo@gmail.com","commits":1,"url":"https://github.com/houbb"}]},"readingTime":{"minutes":8.8,"words":2639},"filePathRelative":"posts/interview/arch/system/中台不是万能药！.md","localizedDate":"2025年3月30日","excerpt":"\\n<blockquote>\\n<p>作者：老马<br>\\n<br>公众号：老马啸西风<br>\\n<br> 博客：<a href=\\"https://houbb.github.io/\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">https://houbb.github.io/</a><br>\\n<br> 人生理念：知行合一</p>\\n</blockquote>\\n<p>大家好，我是老马~</p>\\n<p>今天跟大家聊聊下中台，欢迎留言讨论</p>\\n<p>中台最早是由阿里巴巴推动在国内火起来的，早在2015年，马云带领阿里多位高管拜访芬兰著名的游戏公司Supercell，看到平均一款游戏落地只需要5~7人，被这种高效工作模式触动。</p>","autoDesc":true}');export{l as comp,b as data};
