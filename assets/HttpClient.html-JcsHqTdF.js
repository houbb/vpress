import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as e,a,o as i}from"./app-NomDibRt.js";const t={};function l(p,n){return i(),e("div",null,n[0]||(n[0]=[a(`<h1 id="spring-boot-集成-httpclient" tabindex="-1"><a class="header-anchor" href="#spring-boot-集成-httpclient"><span>Spring Boot 集成 HttpClient</span></a></h1><blockquote><p>作者：老马<br><br>公众号：老马啸西风<br><br> 博客：<a href="https://houbb.github.io/" target="_blank" rel="noopener noreferrer">https://houbb.github.io/</a><br><br> 人生理念：知行合一</p></blockquote><p><code>Spring Boot 作为主流微服务框架，拥有成熟的社区生态。市场应用广泛，为了方便大家，整理了一个基于spring boot的常用中间件快速集成入门系列手册，涉及RPC、缓存、消息队列、分库分表、注册中心、分布式配置等常用开源组件，大概有几十篇文章，陆续会开放出来，感兴趣同学可以关注&amp;收藏</code></p><h2 id="简介" tabindex="-1"><a class="header-anchor" href="#简介"><span>简介</span></a></h2><p>HTTP 协议可能是现在 Internet 上使用得最多、最重要的协议了，越来越多的 Java 应用程序需要直接通过 HTTP 协议来访问网络资源。虽然在 JDK 的 java net包中已经提供了访问 HTTP 协议的基本功能，但是对于大部分应用程序来说，JDK 库本身提供的功能还不够丰富和灵活。HttpClient 是Apache HttpComponents 下的子项目，用来提供高效的、最新的、功能丰富的支持 HTTP 协议的客户端编程工具包，并且它支持 HTTP 协议最新的版本和建议。</p><h2 id="使用流程" tabindex="-1"><a class="header-anchor" href="#使用流程"><span>使用流程</span></a></h2><ul><li>创建一个<code>HttpClient</code>对象</li><li>创建请求方法的实例，并指定请求<code>URL</code>。 <ul><li>如果需要发送<code>GET</code>请求，创建<code>HttpGet</code>对象；</li><li>如果需要发送<code>POST</code>请求，创建<code>HttpPost</code>对象。</li></ul></li><li>如果需要发送请求参数，可调用<code>HttpGet.setParams</code>方法来添加请求参数；对于<code>HttpPost</code>对象而言，可调用<code>setEntity(HttpEntity entity)</code>方法来设置请求参数。</li><li>使用<code>HttpClient</code>对象的<code>execute(HttpUriRequest request)</code>发送请求，该方法返回一个<code>HttpResponse</code>对象。</li><li>调用<code>HttpResponse</code>的<code>getAllHeaders()</code>、<code>getHeaders(String name)</code>等方法可获取服务器的响应头；调用<code>HttpResponse</code>的<code>getEntity()</code>方法可获取<code>HttpEntity</code>对象，该对象包装了服务器的响应内容。程序可通过该对象获取服务器的响应内容。</li><li>释放连接。无论执行方法是否成功，都必须释放连接</li></ul><h2 id="代码演示" tabindex="-1"><a class="header-anchor" href="#代码演示"><span>代码演示</span></a></h2><h3 id="外部依赖" tabindex="-1"><a class="header-anchor" href="#外部依赖"><span>外部依赖</span></a></h3><p>在pom.xml中添加以下依赖项：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&lt;dependency&gt;</span></span>
<span class="line"><span>    &lt;groupId&gt;org.apache.httpcomponents&lt;/groupId&gt;</span></span>
<span class="line"><span>    &lt;artifactId&gt;httpclient&lt;/artifactId&gt;</span></span>
<span class="line"><span>    &lt;version&gt;4.5.10&lt;/version&gt;</span></span>
<span class="line"><span>&lt;/dependency&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="初始化" tabindex="-1"><a class="header-anchor" href="#初始化"><span>初始化</span></a></h3><p>初始化 <code>CloseableHttpClient</code> 客户端实例</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>ConnectionKeepAliveStrategy myStrategy = new ConnectionKeepAliveStrategy() {</span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public long getKeepAliveDuration(HttpResponse response, HttpContext context) {</span></span>
<span class="line"><span>        Args.notNull(response, &quot;HTTP response&quot;);</span></span>
<span class="line"><span>        final HeaderElementIterator it = new BasicHeaderElementIterator(</span></span>
<span class="line"><span>                response.headerIterator(HTTP.CONN_KEEP_ALIVE));</span></span>
<span class="line"><span>        while (it.hasNext()) {</span></span>
<span class="line"><span>            final HeaderElement he = it.nextElement();</span></span>
<span class="line"><span>            final String param = he.getName();</span></span>
<span class="line"><span>            final String value = he.getValue();</span></span>
<span class="line"><span>            if (value != null &amp;&amp; &quot;timeout&quot;.equalsIgnoreCase(param)) {</span></span>
<span class="line"><span>                try {</span></span>
<span class="line"><span>                    return Long.parseLong(value) * 1000;</span></span>
<span class="line"><span>                } catch (final NumberFormatException ignore) {</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        return 1;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>httpClient = HttpClients.custom().setConnectionManagerShared(true)</span></span>
<span class="line"><span>        .setConnectionManager(cm)</span></span>
<span class="line"><span>        .setKeepAliveStrategy(myStrategy)</span></span>
<span class="line"><span>        .evictExpiredConnections()</span></span>
<span class="line"><span>        .build();</span></span>
<span class="line"><span>return httpClient;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>目前最新版的 HttpClient 的实现类为 CloseableHttpClient</p><p><strong>创建 CloseableHttpClient 实例有两种方式：</strong></p><ul><li><p>使用<code>CloseableHttpClient</code>的工厂类<code>HttpClients</code>的方法来创建实例。<code>HttpClients</code>提供了根据各种默认配置来创建<code>CloseableHttpClient</code>实例的快捷方法。最简单的实例化方式是调用<code>HttpClients.createDefault()</code>。</p></li><li><p>使用<code>CloseableHttpClient</code>的builder类<code>HttpClientBuilder</code>，先对一些属性进行配置（采用装饰者模式，不断的.setxxxxx().setxxxxxxxx()就行了），再调用build方法来创建实例。上面的<code>HttpClients.createDefault()</code>实际上调用的也就是<code>HttpClientBuilder.create().build()</code>。</p></li></ul><p>build()方法最终是根据各种配置来new一个<code>InternalHttpClient</code>实例（<code>CloseableHttpClient</code>抽象类的子类）。</p><h3 id="发送post请求" tabindex="-1"><a class="header-anchor" href="#发送post请求"><span>发送post请求</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>private static String doPost(String url, String postData, Map&lt;String, String&gt; mapHeader, HttpHost proxy) {</span></span>
<span class="line"><span>    HttpPost httpPost = null;</span></span>
<span class="line"><span>    CloseableHttpResponse response = null;</span></span>
<span class="line"><span>    try {</span></span>
<span class="line"><span>        httpPost = new HttpPost(url);</span></span>
<span class="line"><span>        httpPost.setConfig(requestConfig);</span></span>
<span class="line"><span>        for (Map.Entry&lt;String, String&gt; entry : mapHeader.entrySet()) {</span></span>
<span class="line"><span>            httpPost.setHeader(entry.getKey(), entry.getValue());</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        httpPost.setEntity(new StringEntity(postData, DEFAULT_CHARSET));</span></span>
<span class="line"><span>        if (proxy == null) {</span></span>
<span class="line"><span>            response = getHttpClient().execute(httpPost,</span></span>
<span class="line"><span>                    HttpClientContext.create());</span></span>
<span class="line"><span>        } else {</span></span>
<span class="line"><span>            response = getHttpClient().execute(proxy, httpPost,</span></span>
<span class="line"><span>                    HttpClientContext.create());</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        String result = getContent(response);</span></span>
<span class="line"><span>        return result;</span></span>
<span class="line"><span>    } catch (Exception e) {</span></span>
<span class="line"><span>        log.error(&quot;post error, e:{}, url:{},parameterMap:{}&quot;, e.getMessage(), url,</span></span>
<span class="line"><span>                postData, e);</span></span>
<span class="line"><span>        return null;</span></span>
<span class="line"><span>    } finally {</span></span>
<span class="line"><span>        release(httpPost, response);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>本地跑单元测试，发送<code>post</code>模拟请求，请求参数采用<code>json</code>格式数据，<code>content-type = &quot;application/json;charset=utf-8&quot;</code></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>@Test</span></span>
<span class="line"><span>public void queryUser() {</span></span>
<span class="line"><span>    User user = User.builder().userName(&quot;TomGE&quot;).age(29).address(&quot;北京&quot;).build();</span></span>
<span class="line"><span>    String url = &quot;http://localhost:8090/queryUser&quot;;</span></span>
<span class="line"><span>    String requestJson = JSON.toJSONString(user);</span></span>
<span class="line"><span>    String result = HttpClientUtil.postJsonRequest(url, requestJson, null);</span></span>
<span class="line"><span>    System.out.println(&quot;响应结果：&quot;);</span></span>
<span class="line"><span>    System.out.println(result);</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>响应结果：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>已经接收到请求，用户名：TomGE , 年龄：29 , 地址：北京。响应：sucess!</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="注意事项" tabindex="-1"><a class="header-anchor" href="#注意事项"><span>注意事项</span></a></h2><ul><li>连接池最大连接数，不配置为20</li><li>同个route的最大连接数，不配置为2</li><li>去连接池中取连接的超时时间，不配置则无限期等待</li><li>与目标服务器建立连接的超时时间，不配置则无限期等待</li><li>去目标服务器取数据的超时时间，不配置则无限期等待</li><li>要fully consumed entity，才能正确释放底层资源</li><li>同个host但ip有多个的情况，请谨慎使用单例的HttpClient和连接池</li><li>HTTP1.1默认支持的是长连接，如果想使用短连接，要在request的header上加<code>Connection:close</code>，不然长连接是不可能自动被关掉的！</li></ul><h2 id="项目源码" tabindex="-1"><a class="header-anchor" href="#项目源码"><span>项目源码</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>https://github.com/aalansehaiyang/spring-boot-bulking  </span></span>
<span class="line"><span></span></span>
<span class="line"><span>模块：spring-boot-bulking-httpclient</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,28)]))}const d=s(t,[["render",l]]),c=JSON.parse('{"path":"/posts/interview/spring/springboot/HttpClient.html","title":"Spring Boot 集成 HttpClient","lang":"zh-CN","frontmatter":{"title":"Spring Boot 集成 HttpClient","description":"Spring Boot 集成 HttpClient 作者：老马 公众号：老马啸西风 博客：https://houbb.github.io/ 人生理念：知行合一 Spring Boot 作为主流微服务框架，拥有成熟的社区生态。市场应用广泛，为了方便大家，整理了一个基于spring boot的常用中间件快速集成入门系列手册，涉及RPC、缓存、消息队列、分库...","head":[["meta",{"property":"og:url","content":"https://houbb.github.io/vpress/posts/interview/spring/springboot/HttpClient.html"}],["meta",{"property":"og:site_name","content":"老马啸西风"}],["meta",{"property":"og:title","content":"Spring Boot 集成 HttpClient"}],["meta",{"property":"og:description","content":"Spring Boot 集成 HttpClient 作者：老马 公众号：老马啸西风 博客：https://houbb.github.io/ 人生理念：知行合一 Spring Boot 作为主流微服务框架，拥有成熟的社区生态。市场应用广泛，为了方便大家，整理了一个基于spring boot的常用中间件快速集成入门系列手册，涉及RPC、缓存、消息队列、分库..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-03-30T09:38:40.000Z"}],["meta",{"property":"article:modified_time","content":"2025-03-30T09:38:40.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Spring Boot 集成 HttpClient\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-03-30T09:38:40.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"老马啸西风\\",\\"url\\":\\"https://houbb.github.io\\"}]}"]]},"git":{"createdTime":1743327520000,"updatedTime":1743327520000,"contributors":[{"name":"houbb","username":"houbb","email":"houbinbin.echo@gmail.com","commits":1,"url":"https://github.com/houbb"}]},"readingTime":{"minutes":3.86,"words":1158},"filePathRelative":"posts/interview/spring/springboot/HttpClient.md","localizedDate":"2025年3月30日","excerpt":"\\n<blockquote>\\n<p>作者：老马<br>\\n<br>公众号：老马啸西风<br>\\n<br> 博客：<a href=\\"https://houbb.github.io/\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">https://houbb.github.io/</a><br>\\n<br> 人生理念：知行合一</p>\\n</blockquote>\\n<p><code>Spring Boot 作为主流微服务框架，拥有成熟的社区生态。市场应用广泛，为了方便大家，整理了一个基于spring boot的常用中间件快速集成入门系列手册，涉及RPC、缓存、消息队列、分库分表、注册中心、分布式配置等常用开源组件，大概有几十篇文章，陆续会开放出来，感兴趣同学可以关注&amp;收藏</code></p>","autoDesc":true}');export{d as comp,c as data};
