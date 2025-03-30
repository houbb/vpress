import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as e,a as i,o as a}from"./app-NomDibRt.js";const l={};function p(t,s){return a(),e("div",null,s[0]||(s[0]=[i(`<h1 id="redis-实现分布式锁真的安全吗" tabindex="-1"><a class="header-anchor" href="#redis-实现分布式锁真的安全吗"><span>Redis 实现分布式锁真的安全吗？</span></a></h1><blockquote><p>作者：老马<br><br>公众号：老马啸西风<br><br> 博客：<a href="https://houbb.github.io/" target="_blank" rel="noopener noreferrer">https://houbb.github.io/</a><br><br> 人生理念：知行合一</p></blockquote><p><code>Spring Boot 作为主流微服务框架，拥有成熟的社区生态。市场应用广泛，为了方便大家，整理了一个基于spring boot的常用中间件快速集成入门系列手册，涉及RPC、缓存、消息队列、分库分表、注册中心、分布式配置等常用开源组件，大概有几十篇文章，陆续会开放出来，感兴趣同学可以关注&amp;收藏</code></p><p>锁的种类非常多。之前写过一篇文章，对工作中常用锁做了总结，如：乐观锁、悲观锁、分布式锁、可重入锁、自旋锁、独享锁、共享锁、互斥锁、读写锁、阻塞锁、公平锁、非公平锁、分段锁、对象锁、类锁、信号量、行锁。</p><p>之前文章： <a href="https://mp.weixin.qq.com/s/VUwexGERUjTeMnDEpRMB3g" target="_blank" rel="noopener noreferrer">一文全面梳理各种锁机制</a></p><h2 id="什么是分布式锁" tabindex="-1"><a class="header-anchor" href="#什么是分布式锁"><span>什么是分布式锁</span></a></h2><p>Java中常用的锁有 synchronized、Lock锁，并发编程中，我们通过锁实现多个线程竞争同一个共享资源或者变量而造成的数据不一致问题，但是JVM锁只适用于单体应用。</p><p>随着互联网业务快速发展，软件架构开始向分布式集群演化。由于分布式系统的多线程分布在不同的服务器上，为了跨JVM控制全局共享资源的访问，于是诞生了分布式锁。</p><p><strong>定义：</strong></p><p>分布式锁是控制分布式系统之间同步访问共享资源的一种方式。在分布式系统中，常常需要协调他们的动作，如果不同的系统或是同一个系统的不同服务器之间共享了一个或一组资源，那么访问这些资源的时候，往往需要互斥来防止彼此干扰来保证一致性，在这种情况下，便需要使用到分布式锁。</p><p><strong>特点：</strong></p><ul><li>互斥性。任意时刻，只有一个客户端能持有锁。</li><li>锁超时。和本地锁一样支持锁超时，防止死锁</li><li>高可用。加锁和解锁要保证性能，同时也需要保证高可用防止分布式锁失效，可以增加降级。</li><li>支持阻塞和非阻塞。和<code>ReentrantLock</code> 一样支持 lock 和 trylock 以及 tryLock(long timeOut)。</li></ul><p><strong>实现方式：</strong></p><ul><li>数据库锁</li><li>基于Redis的分布式锁</li><li>基于Zookeeper的分布式锁</li></ul><blockquote><p>考虑到性能要求，一般采用redis来实现分布式锁。另外，在实际的业务应用中，如果你想要提升分布式锁的可靠性，可以通过 <code>Redlock</code> 算法来实现。</p></blockquote><h2 id="代码示例" tabindex="-1"><a class="header-anchor" href="#代码示例"><span>代码示例</span></a></h2><p>通过redis原子命令 <code>set key value [NX|XX] [EX seconds | PX milliseconds]</code> 来是实现加锁操作。</p><p><strong>参数解释：</strong></p><ul><li>EX seconds：设置失效时长，单位秒</li><li>PX milliseconds：表示这个 key 的存活时间，称作锁过期时间，单位毫秒。当资源被锁定超过这个时间时，锁将自动释放。</li><li>NX：key不存在时设置value，成功返回OK，失败返回(nil)</li><li>XX：key存在时设置value，成功返回OK，失败返回(nil)</li><li>value：必须是全局唯一的值。这个随机数在释放锁时保证释放锁操作的安全性。</li></ul><blockquote><p>原理：只有在某个 key 不存在的情况下才能设置（set）成功该 key。于是，这就可以让多个线程并发去设置同一个 key，只有一个线程能设置成功。而其它的线程因为之前有人把 key 设置成功了，而导致失败（也就是获得锁失败）。</p></blockquote><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>/**</span></span>
<span class="line"><span> * 获取锁</span></span>
<span class="line"><span> * &lt;p&gt;</span></span>
<span class="line"><span> * true：成功获取锁</span></span>
<span class="line"><span> * false：本次请求没有拿到锁</span></span>
<span class="line"><span> */</span></span>
<span class="line"><span>public boolean lock(String key, String value, long expireTime) {</span></span>
<span class="line"><span>    key = prefixKey + key;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    boolean lock = false;</span></span>
<span class="line"><span>    try {</span></span>
<span class="line"><span>        lock = redisTemplate.opsForValue().setIfAbsent(key, value, expireTime, TimeUnit.MILLISECONDS);</span></span>
<span class="line"><span>    } catch (Exception e) {</span></span>
<span class="line"><span>        e.printStackTrace();</span></span>
<span class="line"><span>        lock = false;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    if (lock) {</span></span>
<span class="line"><span>        System.out.println(String.format(&quot;%s 已经拿到了锁，当前时间：%s&quot;, Thread.currentThread().getName(), System.currentTimeMillis() / 1000));</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return lock;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>分布式锁使用结束后需要手动来释放锁。可以直接通过 <code>del</code> 命令删除key即可，但是从高可用性上讲，如果业务的执行时间超过了锁释放的时间，导致 redis 中的key 自动超时过期，锁被动释放。然后被其他线程竞争获取了锁，此时之前的线程再释放的就是别人的锁，会引发混乱。</p><blockquote><p>为了避免该问题，我们通过lua脚本，在释放锁时，先进行值比较判断，只能释放自己的锁！！！</p></blockquote><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>public boolean unLock(String key, String value) {</span></span>
<span class="line"><span>    key = prefixKey + key;</span></span>
<span class="line"><span>    Long result = -1L;</span></span>
<span class="line"><span>    String luaScript =</span></span>
<span class="line"><span>            &quot;if redis.call(&#39;get&#39;, KEYS[1]) == ARGV[1] then &quot; +</span></span>
<span class="line"><span>             &quot;  return redis.call(&#39;del&#39;, KEYS[1]) &quot; +</span></span>
<span class="line"><span>             &quot;else &quot; +</span></span>
<span class="line"><span>             &quot;  return 0 &quot; +</span></span>
<span class="line"><span>             &quot;end&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    DefaultRedisScript&lt;Long&gt; redisScript = new DefaultRedisScript(luaScript, Long.class);</span></span>
<span class="line"><span>    try {</span></span>
<span class="line"><span>        // del 成功返回 1</span></span>
<span class="line"><span>        result = (Long) redisTemplate.execute(redisScript, Lists.list(key), value);</span></span>
<span class="line"><span>        // System.out.println(result);</span></span>
<span class="line"><span>    } catch (Exception e) {</span></span>
<span class="line"><span>        e.printStackTrace();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return result == 1 ? true : false;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>在这种场景（主从结构）中存在明显的竞态: 客户端A从master获取到锁， 在master将锁同步到slave之前，master宕掉了。slave节点被晋升为新的master节点， 客户端B取得了同一个资源被客户端A已经获取到的另外一个锁。「安全失效」！</p></blockquote><h2 id="redisson-实现分布式锁" tabindex="-1"><a class="header-anchor" href="#redisson-实现分布式锁"><span>Redisson 实现分布式锁</span></a></h2><p>为了避免 Redis 实例故障而导致的锁无法工作的问题，Redis 的开发者 Antirez 提出了分布式锁算法<code>Redlock</code>。</p><p>Redlock 算法的基本思路，是让客户端和多个独立的 Redis 实例依次请求加锁，如果客户端能够和半数以上的实例成功地完成加锁操作，那么我们就认为，客户端成功地获得分布式锁了，否则加锁失败。这样一来，即使有单个 Redis 实例发生故障，因为锁变量在其它实例上也有保存，所以，客户端仍然可以正常地进行锁操作。</p><p><strong>执行步骤：</strong></p><p>1、第一步，客户端获取当前时间。</p><p>2、第二步，客户端按顺序依次向 N 个 Redis 实例执行加锁操作。</p><p>这里的加锁操作和在单实例上执行的加锁操作一样，使用 SET 命令，带上 NX，EX/PX 选项，以及带上客户端的唯一标识。当然，如果某个 Redis 实例发生故障了，为了保证在这种情况下，Redlock 算法能够继续运行，我们需要给加锁操作设置一个超时时间。</p><p>如果客户端在和一个 Redis 实例请求加锁时，一直到超时都没有成功，那么此时，客户端会和下一个 Redis 实例继续请求加锁。加锁操作的超时时间需要远远地小于锁的有效时间，一般为几十毫秒。</p><p>3、第三步，一旦客户端完成了和所有 Redis 实例的加锁操作，客户端就要计算整个加锁过程的总耗时。只有在满足下面的这两个条件时，才能认为是加锁成功。</p><ul><li>条件一：客户端从超过半数（大于等于 N/2+1）的 Redis 实例上成功获取到了锁；</li><li>条件二：客户端获取锁的总耗时没有超过锁的有效时间。</li></ul><p>在满足了这两个条件后，我们需要重新计算这把锁的有效时间，计算的结果是锁的最初有效时间减去客户端为获取锁的总耗时。如果锁的有效时间已经来不及完成共享数据的操作了，我们可以释放锁，以免出现还没完成数据操作，锁就过期了的情况。</p><p>当然，如果客户端在和所有实例执行完加锁操作后，没能同时满足这两个条件，那么，客户端向所有 Redis 节点发起释放锁的操作。</p><p>在 Redlock 算法中，释放锁的操作和在单实例上释放锁的操作一样，只要执行释放锁的 Lua 脚本就可以了。这样一来，只要 N 个 Redis 实例中的半数以上实例能正常工作，就能保证分布式锁的正常工作了。</p><p><strong>代码示例：</strong></p><p>首先引入<code>Redisson</code>依赖的Jar包</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&lt;dependency&gt;</span></span>
<span class="line"><span>    &lt;groupId&gt;org.redisson&lt;/groupId&gt;</span></span>
<span class="line"><span>    &lt;artifactId&gt;redisson&lt;/artifactId&gt;</span></span>
<span class="line"><span>    &lt;version&gt;3.9.1&lt;/version&gt;</span></span>
<span class="line"><span>&lt;/dependency&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>Redisson</code> 支持3种方式连接redis，分别为单机、Sentinel 哨兵、Cluster 集群，项目中使用的连接方式是 Sentinel。</p><p>Sentinel配置，首先创建<code>RedissonClient</code>客户端实例</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>Config config = new Config();</span></span>
<span class="line"><span>config.useSentinelServers().addSentinelAddress(&quot;127.0.0.1:6479&quot;, &quot;127.0.0.1:6489&quot;).setMasterName(&quot;master&quot;).setPassword(&quot;password&quot;).setDatabase(0);</span></span>
<span class="line"><span>RedissonClient redisson = Redisson.create(config);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>加锁、释放锁</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>RLock lock = redisson.getLock(&quot;test_lock&quot;);</span></span>
<span class="line"><span>try{</span></span>
<span class="line"><span>    boolean isLock=lock.tryLock();</span></span>
<span class="line"><span>    if(isLock){</span></span>
<span class="line"><span>        // 模拟业务处理</span></span>
<span class="line"><span>        doBusiness();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}catch(exception e){</span></span>
<span class="line"><span>}finally{</span></span>
<span class="line"><span>    lock.unlock();</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="项目源码" tabindex="-1"><a class="header-anchor" href="#项目源码"><span>项目源码</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>https://github.com/aalansehaiyang/spring-boot-bulking  </span></span>
<span class="line"><span></span></span>
<span class="line"><span>模块：spring-boot-bulking-redis-lock</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,48)]))}const o=n(l,[["render",p]]),c=JSON.parse('{"path":"/posts/interview/spring/springboot/Redis-safety.html","title":"Redis 实现分布式锁真的安全吗","lang":"zh-CN","frontmatter":{"title":"Redis 实现分布式锁真的安全吗","description":"Redis 实现分布式锁真的安全吗？ 作者：老马 公众号：老马啸西风 博客：https://houbb.github.io/ 人生理念：知行合一 Spring Boot 作为主流微服务框架，拥有成熟的社区生态。市场应用广泛，为了方便大家，整理了一个基于spring boot的常用中间件快速集成入门系列手册，涉及RPC、缓存、消息队列、分库分表、注册中心...","head":[["meta",{"property":"og:url","content":"https://houbb.github.io/vpress/posts/interview/spring/springboot/Redis-safety.html"}],["meta",{"property":"og:site_name","content":"老马啸西风"}],["meta",{"property":"og:title","content":"Redis 实现分布式锁真的安全吗"}],["meta",{"property":"og:description","content":"Redis 实现分布式锁真的安全吗？ 作者：老马 公众号：老马啸西风 博客：https://houbb.github.io/ 人生理念：知行合一 Spring Boot 作为主流微服务框架，拥有成熟的社区生态。市场应用广泛，为了方便大家，整理了一个基于spring boot的常用中间件快速集成入门系列手册，涉及RPC、缓存、消息队列、分库分表、注册中心..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-03-30T09:38:40.000Z"}],["meta",{"property":"article:modified_time","content":"2025-03-30T09:38:40.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Redis 实现分布式锁真的安全吗\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-03-30T09:38:40.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"老马啸西风\\",\\"url\\":\\"https://houbb.github.io\\"}]}"]]},"git":{"createdTime":1743327520000,"updatedTime":1743327520000,"contributors":[{"name":"houbb","username":"houbb","email":"houbinbin.echo@gmail.com","commits":1,"url":"https://github.com/houbb"}]},"readingTime":{"minutes":7.25,"words":2176},"filePathRelative":"posts/interview/spring/springboot/Redis-safety.md","localizedDate":"2025年3月30日","excerpt":"\\n<blockquote>\\n<p>作者：老马<br>\\n<br>公众号：老马啸西风<br>\\n<br> 博客：<a href=\\"https://houbb.github.io/\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">https://houbb.github.io/</a><br>\\n<br> 人生理念：知行合一</p>\\n</blockquote>\\n<p><code>Spring Boot 作为主流微服务框架，拥有成熟的社区生态。市场应用广泛，为了方便大家，整理了一个基于spring boot的常用中间件快速集成入门系列手册，涉及RPC、缓存、消息队列、分库分表、注册中心、分布式配置等常用开源组件，大概有几十篇文章，陆续会开放出来，感兴趣同学可以关注&amp;收藏</code></p>","autoDesc":true}');export{o as comp,c as data};
