import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,a as e,o as i}from"./app-NomDibRt.js";const p="/vpress/images/spring/springboot/17-4.jpg",t="/vpress/images/spring/springboot/17-5.jpg",o="/vpress/images/spring/springboot/17-1.jpg",r="/vpress/images/spring/springboot/17-2.jpg",l="/vpress/images/spring/springboot/17-3.jpg",c={};function d(h,s){return i(),n("div",null,s[0]||(s[0]=[e('<h1 id="spring-boot-集成-nacos" tabindex="-1"><a class="header-anchor" href="#spring-boot-集成-nacos"><span>Spring Boot 集成 Nacos</span></a></h1><blockquote><p>作者：老马<br><br>公众号：老马啸西风<br><br> 博客：<a href="https://houbb.github.io/" target="_blank" rel="noopener noreferrer">https://houbb.github.io/</a><br><br> 人生理念：知行合一</p></blockquote><p><code>Spring Boot 作为主流微服务框架，拥有成熟的社区生态。市场应用广泛，为了方便大家，整理了一个基于spring boot的常用中间件快速集成入门系列手册，涉及RPC、缓存、消息队列、分库分表、注册中心、分布式配置等常用开源组件，大概有几十篇文章，陆续会开放出来，感兴趣同学可以关注&amp;收藏</code></p><h2 id="简介" tabindex="-1"><a class="header-anchor" href="#简介"><span>简介</span></a></h2><p>Nacos 是阿里巴巴的开源的项目，全称 Naming Configuration Service ，专注于服务发现和配置管理领域。</p><p>Nacos 致力于帮助您发现、配置和管理微服务。Nacos 提供了一组简单易用的特性集，帮助您快速实现动态服务发现、服务配置、服务元数据及流量管理。</p><p>客户端语言方面目前支持 Java，go 、python、 C# 和 C++等主流语言</p><blockquote><p>开源地址：<a href="https://github.com/alibaba/nacos" target="_blank" rel="noopener noreferrer">https://github.com/alibaba/nacos</a></p></blockquote><div align="left"><img src="'+p+'" width="700px"></div><p>目前 Github上已经有近 <strong>18K</strong> 的 start，又有阿里巴巴复杂的业务做背书，在开源市场非常受欢迎。最近一次 commits 时间在2021年5月6日，社区维护投入力度很大，一些bug也能及时修复。</p><h2 id="核心功能" tabindex="-1"><a class="header-anchor" href="#核心功能"><span>核心功能</span></a></h2><ul><li>动态配置服务</li></ul><p>动态配置服务让您能够以中心化、外部化和动态化的方式管理所有环境的配置。动态配置消除了配置变更时重新部署应用和服务的需要。配置中心化管理让实现无状态服务更简单，也让按需弹性扩展服务更容易。</p><ul><li>服务发现及管理</li></ul><p>动态服务发现对以服务为中心的（例如微服务和云原生）应用架构方式非常关键。Nacos支持DNS-Based和RPC-Based（Dubbo、gRPC）模式的服务发现。Nacos也提供实时健康检查，以防止将请求发往不健康的主机或服务实例。借助Nacos，您可以更容易地为您的服务实现断路器。</p><ul><li>动态DNS服务</li></ul><p>通过支持权重路由，动态DNS服务能让您轻松实现中间层负载均衡、更灵活的路由策略、流量控制以及简单数据中心内网的简单DNS解析服务。动态DNS服务还能让您更容易地实现以DNS协议为基础的服务发现，以消除耦合到厂商私有服务发现API上的风险。</p><h2 id="nacos-2-x-优点" tabindex="-1"><a class="header-anchor" href="#nacos-2-x-优点"><span>Nacos 2.x 优点</span></a></h2><p>在Nacos 1.X 基础上，对通讯层做了优化，目前采用了<code>gRPC</code>实现了长连接和配置推动，使用长链接的好处大幅度减少了 1.x 轮询心跳频繁导致 JVM Full GC。</p><div align="left"><img src="'+t+`" width="700px"></div><p>1、客户端不再需要定时发送实例心跳，只需要有一个维持连接可用 <code>keepalive</code> 消息即可。重复 TPS 可以大幅降低。</p><p>2、TCP 连接断开可以被快速感知到，提升反应速度。</p><p>3、长连接的流式推送，比 UDP 更加可靠；nio 的机制具有更高的吞吐量，而且由于可靠推送，可以加长客户端用于对账服务列表的时间，甚至删除相关的请求。重复的无效 QPS 可以大幅降低。</p><p>4、长连接避免频繁连接开销，可以大幅缓解 <code>TIME_WAIT</code> 问题。</p><p>5、真实的长连接，解决配置模块 GC 问题。</p><p>6、更细粒度的同步内容，减少服务节点间的通信压力。</p><h2 id="代码演示" tabindex="-1"><a class="header-anchor" href="#代码演示"><span>代码演示</span></a></h2><h3 id="外部依赖" tabindex="-1"><a class="header-anchor" href="#外部依赖"><span>外部依赖</span></a></h3><p>Spring Boot 已经为 Nacos 封装了starter组件，只需在 pom.xml 文件中添加jar版本依赖即可：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&lt;dependency&gt;</span></span>
<span class="line"><span>    &lt;groupId&gt;com.alibaba.boot&lt;/groupId&gt;</span></span>
<span class="line"><span>    &lt;artifactId&gt;nacos-config-spring-boot-starter&lt;/artifactId&gt;</span></span>
<span class="line"><span>    &lt;version&gt;0.2.1&lt;/version&gt;</span></span>
<span class="line"><span>&lt;/dependency&gt;</span></span>
<span class="line"><span>&lt;dependency&gt;</span></span>
<span class="line"><span>    &lt;groupId&gt;com.alibaba.boot&lt;/groupId&gt;</span></span>
<span class="line"><span>    &lt;artifactId&gt;nacos-config-spring-boot-actuator&lt;/artifactId&gt;</span></span>
<span class="line"><span>    &lt;version&gt;0.2.1&lt;/version&gt;</span></span>
<span class="line"><span>&lt;/dependency&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="配置文件" tabindex="-1"><a class="header-anchor" href="#配置文件"><span>配置文件</span></a></h3><p>在配置文件 application.yaml 中配置 Nacos 的相关参数，具体内容如下：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>nacos:</span></span>
<span class="line"><span>  config:</span></span>
<span class="line"><span>    server-addr: 127.0.0.1:8848</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>就像Maven用<code>groupId</code>、<code>artifactId</code>、<code>version</code>三者来定位一个<code>jar</code>包在仓库中的位置一样。Nacos也提供了 Namespace (命名空间) 、Data ID (配置集ID)、 Group (组) 来确定一个配置文件。</p><h3 id="启动类-添加dataid" tabindex="-1"><a class="header-anchor" href="#启动类-添加dataid"><span>启动类，添加dataId</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class,</span></span>
<span class="line"><span>        DataSourceTransactionManagerAutoConfiguration.class})</span></span>
<span class="line"><span>@NacosPropertySource(dataId = &quot;bulking-nacos-example&quot;, autoRefreshed = true)</span></span>
<span class="line"><span>public class StartApplication {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public static void main(String[] args) {</span></span>
<span class="line"><span>        SpringApplication.run(StartApplication.class, args);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="注解方式-动态获取最新值" tabindex="-1"><a class="header-anchor" href="#注解方式-动态获取最新值"><span>注解方式，动态获取最新值</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>@Controller</span></span>
<span class="line"><span>@RequestMapping(&quot;config&quot;)</span></span>
<span class="line"><span>public class ConfigController {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @NacosValue(value = &quot;\${useLocalCache}&quot;, autoRefreshed = true)</span></span>
<span class="line"><span>    private boolean useLocalCache;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @RequestMapping(value = &quot;/get&quot;, method = GET)</span></span>
<span class="line"><span>    @ResponseBody</span></span>
<span class="line"><span>    public boolean get() {</span></span>
<span class="line"><span>        return useLocalCache;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="操作演示" tabindex="-1"><a class="header-anchor" href="#操作演示"><span>操作演示</span></a></h2><h3 id="管理后台" tabindex="-1"><a class="header-anchor" href="#管理后台"><span>管理后台</span></a></h3><p>Nacos是一个用Java语言编写的web项目，Tomcat默认端口是8848，访问8848端口可以打开Nacos管理台。</p><p>访问地址：<a href="http://localhost:8848/nacos/#/login" target="_blank" rel="noopener noreferrer">http://localhost:8848/nacos/#/login</a></p><blockquote><p>用户名和密码：nacos/nacos</p></blockquote><p><strong>新增动态配置</strong></p><div align="left"><img src="`+o+'" width="700px"></div><div align="left"><img src="'+r+'" width="700px"></div><p>当应用启动时，会将当前节点注册到nacos中</p><div align="left"><img src="'+l+`" width="700px"></div><p>首次访问：<a href="http://localhost:9071/config/get" target="_blank" rel="noopener noreferrer">http://localhost:9071/config/get</a></p><p>返回结果：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>true</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>将nacos中 <code>Data Id</code>：<code> bulking-nacos-example</code> 中的 <code>useLocalCache</code> 设置成<code>false</code></p><p>演示工程在不重启的情况下，能实时感知配置项的变化。</p><h2 id="项目源码" tabindex="-1"><a class="header-anchor" href="#项目源码"><span>项目源码</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>https://github.com/aalansehaiyang/spring-boot-bulking  </span></span>
<span class="line"><span></span></span>
<span class="line"><span>模块：spring-boot-bulking-nacos</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料"><span>参考资料</span></a></h2><ul><li><a href="https://mp.weixin.qq.com/s/Q7L6EhO8o4daC3yZPe-e7Q" target="_blank" rel="noopener noreferrer">https://mp.weixin.qq.com/s/Q7L6EhO8o4daC3yZPe-e7Q</a></li></ul>`,57)]))}const u=a(c,[["render",d]]),m=JSON.parse('{"path":"/posts/interview/spring/springboot/Nacos.html","title":"Spring Boot 集成 Nacos","lang":"zh-CN","frontmatter":{"title":"Spring Boot 集成 Nacos","description":"Spring Boot 集成 Nacos 作者：老马 公众号：老马啸西风 博客：https://houbb.github.io/ 人生理念：知行合一 Spring Boot 作为主流微服务框架，拥有成熟的社区生态。市场应用广泛，为了方便大家，整理了一个基于spring boot的常用中间件快速集成入门系列手册，涉及RPC、缓存、消息队列、分库分表、注册...","head":[["meta",{"property":"og:url","content":"https://houbb.github.io/vpress/posts/interview/spring/springboot/Nacos.html"}],["meta",{"property":"og:site_name","content":"老马啸西风"}],["meta",{"property":"og:title","content":"Spring Boot 集成 Nacos"}],["meta",{"property":"og:description","content":"Spring Boot 集成 Nacos 作者：老马 公众号：老马啸西风 博客：https://houbb.github.io/ 人生理念：知行合一 Spring Boot 作为主流微服务框架，拥有成熟的社区生态。市场应用广泛，为了方便大家，整理了一个基于spring boot的常用中间件快速集成入门系列手册，涉及RPC、缓存、消息队列、分库分表、注册..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-03-30T09:38:40.000Z"}],["meta",{"property":"article:modified_time","content":"2025-03-30T09:38:40.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Spring Boot 集成 Nacos\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-03-30T09:38:40.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"老马啸西风\\",\\"url\\":\\"https://houbb.github.io\\"}]}"]]},"git":{"createdTime":1743327520000,"updatedTime":1743327520000,"contributors":[{"name":"houbb","username":"houbb","email":"houbinbin.echo@gmail.com","commits":1,"url":"https://github.com/houbb"}]},"readingTime":{"minutes":4.42,"words":1325},"filePathRelative":"posts/interview/spring/springboot/Nacos.md","localizedDate":"2025年3月30日","excerpt":"\\n<blockquote>\\n<p>作者：老马<br>\\n<br>公众号：老马啸西风<br>\\n<br> 博客：<a href=\\"https://houbb.github.io/\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">https://houbb.github.io/</a><br>\\n<br> 人生理念：知行合一</p>\\n</blockquote>\\n<p><code>Spring Boot 作为主流微服务框架，拥有成熟的社区生态。市场应用广泛，为了方便大家，整理了一个基于spring boot的常用中间件快速集成入门系列手册，涉及RPC、缓存、消息队列、分库分表、注册中心、分布式配置等常用开源组件，大概有几十篇文章，陆续会开放出来，感兴趣同学可以关注&amp;收藏</code></p>","autoDesc":true}');export{u as comp,m as data};
