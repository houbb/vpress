import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,a as e,o as i}from"./app-NomDibRt.js";const l="/vpress/images/spring/springboot/24-3.jpg",p="/vpress/images/spring/springboot/24-1.jpg",r="/vpress/images/spring/springboot/24-4.jpg",t={};function d(o,s){return i(),a("div",null,s[0]||(s[0]=[e('<h1 id="spring-boot-集成-dubbo" tabindex="-1"><a class="header-anchor" href="#spring-boot-集成-dubbo"><span>Spring Boot 集成 Dubbo</span></a></h1><blockquote><p>作者：老马<br><br>公众号：老马啸西风<br><br> 博客：<a href="https://houbb.github.io/" target="_blank" rel="noopener noreferrer">https://houbb.github.io/</a><br><br> 人生理念：知行合一</p></blockquote><p><code>Spring Boot 作为主流微服务框架，拥有成熟的社区生态。市场应用广泛，为了方便大家，整理了一个基于spring boot的常用中间件快速集成入门系列手册，涉及RPC、缓存、消息队列、分库分表、注册中心、分布式配置等常用开源组件，大概有几十篇文章，陆续会开放出来，感兴趣同学可以关注&amp;收藏</code></p><h2 id="简介" tabindex="-1"><a class="header-anchor" href="#简介"><span>简介</span></a></h2><p>Dubbo是阿里巴巴开源的分布式服务框架，它最大的特点是按照分层的方式来架构，这样可以使各层之间最大限度的松耦合，也就是我们常说的解耦。从服务模型的角度看，Dubbo采用的模型非常简单，服务提供方负责提供服务，消费方负责消费服务，所以可以很方便的抽象出服务提供方（Provider）和消费方(Consumer)两个角色。</p><h2 id="核心能力" tabindex="-1"><a class="header-anchor" href="#核心能力"><span>核心能力</span></a></h2><ul><li>服务的自动注册和发现</li><li>面向接口的远程方法调用</li><li>智能容错和负载均衡</li></ul><h2 id="整体架构" tabindex="-1"><a class="header-anchor" href="#整体架构"><span>整体架构</span></a></h2><div align="left"><img src="'+l+`" width="800px"></div><h2 id="核心步骤" tabindex="-1"><a class="header-anchor" href="#核心步骤"><span>核心步骤</span></a></h2><ul><li>服务器负责启动、加载、运行服务提供方。</li><li>服务方启动时，向注册中心注册自己提供的服务。</li><li>消费者在启动后，向注册中心订阅自己所需要的服务。</li><li>注册中心返回服务提供方地址列表给消费者，如果地址变更，注册中心将基于长连接推送变更数据给消费者。</li><li>消费方从远程接口列表中调用远程接口，Dubbo会基于负载均衡算法，选一台服务提供者进行调用，如果调用失败，会自动调用另一台服务。</li><li>服务方和消费方，在内存中累计调用次数和调用时间，定时（每分钟）发送一次统计数据到监控中心。</li></ul><blockquote><p>源码：<a href="https://github.com/apache/dubbo" target="_blank" rel="noopener noreferrer">https://github.com/apache/dubbo</a></p></blockquote><blockquote><p>官方文档：<a href="https://dubbo.apache.org/zh/docs/v2.7/user/preface/architecture" target="_blank" rel="noopener noreferrer">https://dubbo.apache.org/zh/docs/v2.7/user/preface/architecture</a></p></blockquote><h2 id="代码演示" tabindex="-1"><a class="header-anchor" href="#代码演示"><span>代码演示</span></a></h2><p>上面让大家对dubbo的工作原理有了一定的认识，接下来我们通过一个简单demo示例讲解下dubbo如何使用，涉及三个子工程。</p><ul><li>spring-boot-bulking-dubbo-api 定义接口api</li><li>spring-boot-bulking-dubbo-server 服务提供者</li><li>spring-boot-bulking-dubbo-client 服务消费者</li></ul><h3 id="服务接口定义-spring-boot-bulking-dubbo-api" tabindex="-1"><a class="header-anchor" href="#服务接口定义-spring-boot-bulking-dubbo-api"><span>服务接口定义（spring-boot-bulking-dubbo-api）</span></a></h3><p>pom文件只是依赖常用的基础jar包</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&lt;dependency&gt;</span></span>
<span class="line"><span>    &lt;groupId&gt;com.alibaba&lt;/groupId&gt;</span></span>
<span class="line"><span>    &lt;artifactId&gt;fastjson&lt;/artifactId&gt;</span></span>
<span class="line"><span>    &lt;version&gt;1.2.31&lt;/version&gt;</span></span>
<span class="line"><span>&lt;/dependency&gt;</span></span>
<span class="line"><span>&lt;dependency&gt;</span></span>
<span class="line"><span>    &lt;groupId&gt;org.projectlombok&lt;/groupId&gt;</span></span>
<span class="line"><span>    &lt;artifactId&gt;lombok&lt;/artifactId&gt;</span></span>
<span class="line"><span>    &lt;version&gt;1.18.6&lt;/version&gt;</span></span>
<span class="line"><span>&lt;/dependency&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>定义 <code>UserService</code> 接口</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>/**</span></span>
<span class="line"><span> * @author 微信公众号：老马啸西风</span></span>
<span class="line"><span> */</span></span>
<span class="line"><span>public interface UserService {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public User queryUser(QueryUserParam queryUserParam);</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="服务提供方-spring-boot-bulking-dubbo-server" tabindex="-1"><a class="header-anchor" href="#服务提供方-spring-boot-bulking-dubbo-server"><span>服务提供方（spring-boot-bulking-dubbo-server）</span></a></h3><p>pom文件内容如下</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&lt;!--引入dubbo的依赖--&gt;</span></span>
<span class="line"><span>&lt;dependency&gt;</span></span>
<span class="line"><span>    &lt;groupId&gt;com.alibaba.spring.boot&lt;/groupId&gt;</span></span>
<span class="line"><span>    &lt;artifactId&gt;dubbo-spring-boot-starter&lt;/artifactId&gt;</span></span>
<span class="line"><span>    &lt;version&gt;2.0.0&lt;/version&gt;</span></span>
<span class="line"><span>&lt;/dependency&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;!-- 引入zookeeper的客户端依赖 --&gt;</span></span>
<span class="line"><span>&lt;dependency&gt;</span></span>
<span class="line"><span>    &lt;groupId&gt;com.101tec&lt;/groupId&gt;</span></span>
<span class="line"><span>    &lt;artifactId&gt;zkclient&lt;/artifactId&gt;</span></span>
<span class="line"><span>    &lt;version&gt;0.11&lt;/version&gt;</span></span>
<span class="line"><span>&lt;/dependency&gt;</span></span>
<span class="line"><span>&lt;dependency&gt;</span></span>
<span class="line"><span>    &lt;groupId&gt;org.apache.zookeeper&lt;/groupId&gt;</span></span>
<span class="line"><span>    &lt;artifactId&gt;zookeeper&lt;/artifactId&gt;</span></span>
<span class="line"><span>    &lt;version&gt;3.4.6&lt;/version&gt;</span></span>
<span class="line"><span>    &lt;exclusions&gt;</span></span>
<span class="line"><span>        &lt;exclusion&gt;</span></span>
<span class="line"><span>            &lt;groupId&gt;org.slf4j&lt;/groupId&gt;</span></span>
<span class="line"><span>            &lt;artifactId&gt;slf4j-log4j12&lt;/artifactId&gt;</span></span>
<span class="line"><span>        &lt;/exclusion&gt;</span></span>
<span class="line"><span>        &lt;exclusion&gt;</span></span>
<span class="line"><span>            &lt;groupId&gt;log4j&lt;/groupId&gt;</span></span>
<span class="line"><span>            &lt;artifactId&gt;log4j&lt;/artifactId&gt;</span></span>
<span class="line"><span>        &lt;/exclusion&gt;</span></span>
<span class="line"><span>    &lt;/exclusions&gt;</span></span>
<span class="line"><span>&lt;/dependency&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>application.yaml</code> 配置文件</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>dubbo:</span></span>
<span class="line"><span>  application:</span></span>
<span class="line"><span>    name: spring-boot-bulking-dubbo-server</span></span>
<span class="line"><span>  registry:</span></span>
<span class="line"><span>    address: zookeeper://127.0.0.1:2181</span></span>
<span class="line"><span>  protocol:</span></span>
<span class="line"><span>    name: dubbo</span></span>
<span class="line"><span>    port: 20880</span></span>
<span class="line"><span>  timeout: 10000</span></span>
<span class="line"><span>  scan:</span></span>
<span class="line"><span>    base-packages: com.weiguanjishu.service</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接口实现类</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>@Component</span></span>
<span class="line"><span>@Service</span></span>
<span class="line"><span>public class DubboServiceImpl implements UserService {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public User queryUser(QueryUserParam queryUserParam) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        System.out.println(&quot;请求参数，queryUserParam：&quot; + queryUserParam.getName());</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        User user = User.builder().id(1L).userName(&quot;老马啸西风&quot;).age(11).address(&quot;上海&quot;).build();</span></span>
<span class="line"><span>        return user;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>注意：@Service注解采用dubbo包中的</p></blockquote><p>Server 端启动成功</p><div align="left"><img src="`+p+`" width="700px"></div><h3 id="服务消费方-spring-boot-bulking-dubbo-client" tabindex="-1"><a class="header-anchor" href="#服务消费方-spring-boot-bulking-dubbo-client"><span>服务消费方（spring-boot-bulking-dubbo-client）</span></a></h3><p><code>application.yaml</code> 配置文件</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>dubbo:</span></span>
<span class="line"><span>  application:</span></span>
<span class="line"><span>    name: spring-boot-bulking-dubbo-client</span></span>
<span class="line"><span>  registry:</span></span>
<span class="line"><span>    address: zookeeper://127.0.0.1:2181</span></span>
<span class="line"><span>  protocol:</span></span>
<span class="line"><span>    name: dubbo</span></span>
<span class="line"><span>    port: 20888</span></span>
<span class="line"><span>  timeout: 10000</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编写 Controller，调用远程接口服务</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>@RestController</span></span>
<span class="line"><span>public class UserController {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Reference</span></span>
<span class="line"><span>    UserService userService;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @RequestMapping(&quot;/query&quot;)</span></span>
<span class="line"><span>    public User query() {</span></span>
<span class="line"><span>        QueryUserParam param = new QueryUserParam();</span></span>
<span class="line"><span>        param.setName(&quot;老马啸西风&quot;);</span></span>
<span class="line"><span>        User user = userService.queryUser(param);</span></span>
<span class="line"><span>        System.out.println(JSON.toJSONString(user));</span></span>
<span class="line"><span>        return user;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Restful接口调用，访问：<code>http://localhost:8098/query</code>，运行结果：</p><div align="left"><img src="`+r+`" width="700px"></div><h2 id="项目源码" tabindex="-1"><a class="header-anchor" href="#项目源码"><span>项目源码</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>https://github.com/aalansehaiyang/spring-boot-bulking  </span></span>
<span class="line"><span></span></span>
<span class="line"><span>三个模块：</span></span>
<span class="line"><span>spring-boot-bulking-dubbo-api</span></span>
<span class="line"><span>spring-boot-bulking-dubbo-client</span></span>
<span class="line"><span>spring-boot-bulking-dubbo-server</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,40)]))}const u=n(t,[["render",d]]),v=JSON.parse('{"path":"/posts/interview/spring/springboot/Dubbo.html","title":"Spring Boot 集成 Dubbo","lang":"zh-CN","frontmatter":{"title":"Spring Boot 集成 Dubbo","description":"Spring Boot 集成 Dubbo 作者：老马 公众号：老马啸西风 博客：https://houbb.github.io/ 人生理念：知行合一 Spring Boot 作为主流微服务框架，拥有成熟的社区生态。市场应用广泛，为了方便大家，整理了一个基于spring boot的常用中间件快速集成入门系列手册，涉及RPC、缓存、消息队列、分库分表、注册...","head":[["meta",{"property":"og:url","content":"https://houbb.github.io/vpress/posts/interview/spring/springboot/Dubbo.html"}],["meta",{"property":"og:site_name","content":"老马啸西风"}],["meta",{"property":"og:title","content":"Spring Boot 集成 Dubbo"}],["meta",{"property":"og:description","content":"Spring Boot 集成 Dubbo 作者：老马 公众号：老马啸西风 博客：https://houbb.github.io/ 人生理念：知行合一 Spring Boot 作为主流微服务框架，拥有成熟的社区生态。市场应用广泛，为了方便大家，整理了一个基于spring boot的常用中间件快速集成入门系列手册，涉及RPC、缓存、消息队列、分库分表、注册..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-03-30T09:38:40.000Z"}],["meta",{"property":"article:modified_time","content":"2025-03-30T09:38:40.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Spring Boot 集成 Dubbo\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-03-30T09:38:40.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"老马啸西风\\",\\"url\\":\\"https://houbb.github.io\\"}]}"]]},"git":{"createdTime":1743327520000,"updatedTime":1743327520000,"contributors":[{"name":"houbb","username":"houbb","email":"houbinbin.echo@gmail.com","commits":1,"url":"https://github.com/houbb"}]},"readingTime":{"minutes":3.36,"words":1009},"filePathRelative":"posts/interview/spring/springboot/Dubbo.md","localizedDate":"2025年3月30日","excerpt":"\\n<blockquote>\\n<p>作者：老马<br>\\n<br>公众号：老马啸西风<br>\\n<br> 博客：<a href=\\"https://houbb.github.io/\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">https://houbb.github.io/</a><br>\\n<br> 人生理念：知行合一</p>\\n</blockquote>\\n<p><code>Spring Boot 作为主流微服务框架，拥有成熟的社区生态。市场应用广泛，为了方便大家，整理了一个基于spring boot的常用中间件快速集成入门系列手册，涉及RPC、缓存、消息队列、分库分表、注册中心、分布式配置等常用开源组件，大概有几十篇文章，陆续会开放出来，感兴趣同学可以关注&amp;收藏</code></p>","autoDesc":true}');export{u as comp,v as data};
