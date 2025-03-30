import{_ as i}from"./13-1-CBOkzbgN.js";import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,a as p,o as t}from"./app-NomDibRt.js";const l="/vpress/images/middleware/mysql/18-3.jpeg",d="/vpress/images/middleware/mysql/18-2.jpeg",r="/vpress/images/middleware/mysql/18-5.jpeg",o="/vpress/images/middleware/mysql/18-4.jpeg",s="/vpress/images/middleware/mysql/18-10.jpeg",c="/vpress/images/middleware/mysql/18-6.jpeg",h="/vpress/images/middleware/mysql/18-7.jpeg",b="/vpress/images/middleware/mysql/18-8.jpeg",m="/vpress/images/middleware/mysql/18-9.jpeg",u={};function g(v,e){return t(),a("div",null,e[0]||(e[0]=[p('<h1 id="一张千万级的数据表-删除了一半的数据-你觉得b-树索引文件会不会变小" tabindex="-1"><a class="header-anchor" href="#一张千万级的数据表-删除了一半的数据-你觉得b-树索引文件会不会变小"><span>一张千万级的数据表，删除了一半的数据，你觉得B+树索引文件会不会变小？</span></a></h1><blockquote><p>作者：老马<br><br>公众号：老马啸西风<br><br> 博客：<a href="https://houbb.github.io/" target="_blank" rel="noopener noreferrer">https://houbb.github.io/</a><br><br> 人生理念：知行合一</p></blockquote><h2 id="简介" tabindex="-1"><a class="header-anchor" href="#简介"><span>简介</span></a></h2><p>一张千万级的数据表，删除了一半的数据，你觉得B+树索引文件会不会变小？</p><div align="left"><img src="'+i+`" width="500px"></div><p>（答案在文章中！！）</p><p><strong>我们先来做个实验，看看表的大小是如何变化的？？</strong></p><h2 id="做个实验-让数据说话" tabindex="-1"><a class="header-anchor" href="#做个实验-让数据说话"><span>做个实验，让数据说话</span></a></h2><p>1、首先，在<code>mysql</code>中创建一张用户表，表结构如下：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>CREATE TABLE \`user\` (</span></span>
<span class="line"><span>  \`id\` bigint(20) NOT NULL AUTO_INCREMENT,</span></span>
<span class="line"><span>  \`user_name\` varchar(128) NOT NULL DEFAULT &#39;&#39; COMMENT &#39;用户名&#39;,</span></span>
<span class="line"><span>  \`age\` int(11) NOT NULL  COMMENT &#39;年龄&#39;,</span></span>
<span class="line"><span>  \`address\` varchar(128) COMMENT &#39;地址&#39;,</span></span>
<span class="line"><span>   PRIMARY KEY (\`id\`)</span></span>
<span class="line"><span>) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COMMENT=&#39;用户表&#39;;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2、造数据。用户表中批量插入<code>1000W</code>条数据</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>@GetMapping(&quot;/insert_batch&quot;)</span></span>
<span class="line"><span>public Object insertBatch(@RequestParam(&quot;batch&quot;) int batch) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 设置批次batch=100000，共插入 1000W 条数据</span></span>
<span class="line"><span>    for (int j = 1; j &lt;= batch; j++) {</span></span>
<span class="line"><span>        List&lt;User&gt; userList = new ArrayList&lt;&gt;();</span></span>
<span class="line"><span>        for (int i = 1; i &lt;= 100; i++) {</span></span>
<span class="line"><span>            User user = User.builder().userName(&quot;老马-&quot; + ((j - 1) * 100 + i)).age(29).address(&quot;上海&quot;).build();</span></span>
<span class="line"><span>            userList.add(user);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        userMapper.insertBatch(userList);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return &quot;success&quot;;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>批量插入，每个批次100条记录，100000个批次，共<code>1000W</code>条数据</p></blockquote><div align="left"><img src="`+l+'" width="500px"></div><p>3、查看表文件大小</p><div align="left"><img src="'+d+`" width="500px"></div><blockquote><p>索引文件大小约 595 M，最后修改时间 <code>02:17</code></p></blockquote><p>说明：</p><ul><li>MySQL 8.0 版本以前，表结构是存在以<code>.frm </code>为后缀的文件里</li><li>独享表空间存储方式使用<code>.ibd</code>文件来存放数据和索引，且每个表一个<code>.ibd</code>文件</li></ul><blockquote><p>表数据既可以存在共享表空间，也可以是单独文件。通过<code>innodb_file_per_table</code>参数控制。MySQL 5.6.6 版本之后，默认是ON，这样，每个 InnoDB 表数据存储在一个以 <code>.ibd</code>为后缀的文件中。</p></blockquote><p>4、删除 约<code>500W</code>条数据</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>@GetMapping(&quot;/delete_batch&quot;)</span></span>
<span class="line"><span>public Object deleteBatch(@RequestParam(&quot;batch&quot;) int batch) {</span></span>
<span class="line"><span>    for (int j = 1; j &lt;= batch; j++) {</span></span>
<span class="line"><span>        List&lt;Long&gt; idList = new ArrayList&lt;&gt;();</span></span>
<span class="line"><span>        for (int i = 1; i &lt;= 100; i += 2) {</span></span>
<span class="line"><span>            idList.add((long) ((j - 1) * 100 + i));</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        userMapper.deleteUser(idList);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return &quot;success&quot;;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div align="left"><img src="`+r+'" width="500px"></div><blockquote><p>开始时user表有1000W条数据，删除若干后，目前剩余约 550W 条</p></blockquote><p>5、在删除约500W条记录后，再次查看表文件大小</p><div align="left"><img src="'+o+'" width="500px"></div><blockquote><p>索引文件大小约 595 M，最后修改时间 <code>10:34</code></p></blockquote><p><strong>实验结论：</strong></p><p>对于千万级的表数据存储，删除大量记录后，表文件大小并没有随之变小。好奇怪，是什么原因导致的？<br> 不要着急，接下来，我们来深入剖析其中原因</p><div align="left"><img src="'+s+'" width="500px"></div><p>数据表操作有<code>新增、删除、修改、查询</code>，其中<code>查询</code>属于读操作，并不会修改文件内容。修改文件内容的是<code>写操作</code>，具体分为有<code>删除、新增、修改</code>三种类型。</p><p>接下来，我们开始逐一分析</p><h2 id="删除数据" tabindex="-1"><a class="header-anchor" href="#删除数据"><span>删除数据</span></a></h2><p>InnoDB 中的数据采用<code>B+</code>树来组织结构。如果对B+树存储结构不清楚的话，可以先看下我之前写的一篇文章，巩固下基础知识。</p><p><a href="https://mp.weixin.qq.com/s/IdpY7CPxyqRNx3BYYxl2Ow" target="_blank" rel="noopener noreferrer">面试题：mysql 一棵 B+ 树能存多少条数据？</a></p><p>假如表中已经插入若干条记录，构造的B+树结构如下图所示：</p><div align="left"><img src="'+c+'" width="500px"></div><p>删除<code>id=7</code>这条记录，InnoDB引擎只是把<code>id=7</code>这条记录标记为删除，但是空间保留。如果后面有id位于(6,19)区间内的数据插入时，可以重复使用这个空间。</p><div align="left"><img src="'+h+'" width="500px"></div><p>上图，表示新插入一条<code>id=16</code>的记录。</p><p><strong>除了记录可以复用外，数据页也可以复用。当<code>整个页</code>从B+树摘掉后，可以复用到任何位置。</strong></p><p>比如，将<code>page number=5</code>页上的所有记录删除以后，该page标记为可复用。此时如果插入一条<code>id=100</code>的记录需要使用新页，此时<code>page number=5</code>便可以被复用了。</p><p><strong>如果相邻两个page的利用率都很低，数据库会将两个页的数据合并到其中一个page上，另一个page被标记为可复用。</strong></p><p><strong>当然，如果是像上面我们做的实验那样，将整个表的数据全部delete掉呢？所有的数据页都会被标记为可复用，但空间并没有释放，所以表文件大小依然没有改变。</strong></p><p>总结：delete命令只是把数据页或记录位置标记为<code>可复用</code>，表空间并没有被回收，该现象我们称之为”空洞“</p><h2 id="新增数据" tabindex="-1"><a class="header-anchor" href="#新增数据"><span>新增数据</span></a></h2><p>如果是插入的数据是随机的非主键有序，可能会造成数据页分裂。</p><div align="left"><img src="'+b+'" width="500px"></div><p>上图可以看到，假如<code>page number=5</code>的数据页已经满了，此时插入<code>id=15</code>的记录，需要申请一个新的页<code>page number=6</code>来保存数据。待页分裂完成后，<code>page number=5</code>的最后位置就会留下一个可复用的空洞。</p><p>相反，如果数据是按照索引递增顺序插入的，那么索引是紧凑的，不会出现数据页分裂。</p><h2 id="修改数据" tabindex="-1"><a class="header-anchor" href="#修改数据"><span>修改数据</span></a></h2><p>如果修改的是非索引值，那么并不会影响B+树的结构</p><div align="left"><img src="'+m+'" width="500px"></div><p>比如，更新<code>id=7</code>的其它字段值，主键id保持不变。整个B+树并没有发生结构调整。</p><p><strong>但是，如果修改的内容包含了索引，那么操作步骤是先删除一个旧的值，然后再插入一个新值。可能会造成空洞。</strong></p><p>分析发现，<code>新增、修改、删除</code>数据，都可能造成表空洞，那么有没有什么办法压缩表空间。</p><div align="left"><img src="'+s+'" width="500px"></div><p>客官，请继续往下看</p><h2 id="新建表" tabindex="-1"><a class="header-anchor" href="#新建表"><span>新建表</span></a></h2><p>我们可以新建一个影子表B与原表A的结构一致，然后按主键id由小到大，把数据从表A迁移到表B。由于表B是新表，并不会有空洞，数据页的利用率更高。</p><p>待表A的数据全部迁移完成后，再用表B替换表A。</p><p>MySQL 5.5 版本之前，提供了一键命令，快捷式完成整个流程，<code>转存数据、交换表名、删除旧表</code>。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>alter table 表名  engine=InnoDB</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>但是，该方案有个致命缺点，表重构过程中，如果有新的数据写入<code>表A</code>时，不会被迁移，会造成数据丢失。</p><h2 id="online-ddl" tabindex="-1"><a class="header-anchor" href="#online-ddl"><span>Online DDL</span></a></h2><p>为了解决上面问题，MySQL 5.6 版本开始引入 Online DDL，对流程做了优化。</p><p><strong>执行步骤：</strong></p><ul><li>新建一个临时文件</li><li>扫描表A主键的所有数据页，生成B+ 树，存储到临时文件中</li><li>在生成临时文件过程中，如果有对表A做写操作，操作会记录到一个日志文件中</li><li>当临时文件生成后，再重放日志文件，将操作应用到临时文件</li><li>用临时文件替换表A的数据文件</li><li>删除旧的表A数据文件</li></ul><p>与<code>新建表</code>的最大区别，增加了日志文件记录和重放功能。迁移过程中，允许对表A做增删改操作。</p><h1 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料"><span>参考资料</span></a></h1><ul><li><a href="https://time.geekbang.org/column/article/72388" target="_blank" rel="noopener noreferrer">为什么表数据删掉一半，表文件大小不变？</a></li></ul>',71)]))}const A=n(u,[["render",g]]),k=JSON.parse('{"path":"/posts/interview/middleware/mysql/%E4%B8%80%E5%BC%A0%E5%8D%83%E4%B8%87%E7%BA%A7%E7%9A%84%E6%95%B0%E6%8D%AE%E8%A1%A8%EF%BC%8C%E5%88%A0%E9%99%A4%E4%BA%86%E4%B8%80%E5%8D%8A%E7%9A%84%E6%95%B0%E6%8D%AE%EF%BC%8C%E4%BD%A0%E8%A7%89%E5%BE%97B_%E6%A0%91%E7%B4%A2%E5%BC%95%E6%96%87%E4%BB%B6%E4%BC%9A%E4%B8%8D%E4%BC%9A%E5%8F%98%E5%B0%8F%EF%BC%9F.html","title":"一张千万级的数据表，删除了一半的数据，你觉得B+树索引文件会不会变小？","lang":"zh-CN","frontmatter":{"title":"一张千万级的数据表，删除了一半的数据，你觉得B+树索引文件会不会变小？","description":"一张千万级的数据表，删除了一半的数据，你觉得B+树索引文件会不会变小？ 作者：老马 公众号：老马啸西风 博客：https://houbb.github.io/ 人生理念：知行合一 简介 一张千万级的数据表，删除了一半的数据，你觉得B+树索引文件会不会变小？ （答案在文章中！！） 我们先来做个实验，看看表的大小是如何变化的？？ 做个实验，让数据说话 1、...","head":[["meta",{"property":"og:url","content":"https://houbb.github.io/vpress/posts/interview/middleware/mysql/%E4%B8%80%E5%BC%A0%E5%8D%83%E4%B8%87%E7%BA%A7%E7%9A%84%E6%95%B0%E6%8D%AE%E8%A1%A8%EF%BC%8C%E5%88%A0%E9%99%A4%E4%BA%86%E4%B8%80%E5%8D%8A%E7%9A%84%E6%95%B0%E6%8D%AE%EF%BC%8C%E4%BD%A0%E8%A7%89%E5%BE%97B_%E6%A0%91%E7%B4%A2%E5%BC%95%E6%96%87%E4%BB%B6%E4%BC%9A%E4%B8%8D%E4%BC%9A%E5%8F%98%E5%B0%8F%EF%BC%9F.html"}],["meta",{"property":"og:site_name","content":"老马啸西风"}],["meta",{"property":"og:title","content":"一张千万级的数据表，删除了一半的数据，你觉得B+树索引文件会不会变小？"}],["meta",{"property":"og:description","content":"一张千万级的数据表，删除了一半的数据，你觉得B+树索引文件会不会变小？ 作者：老马 公众号：老马啸西风 博客：https://houbb.github.io/ 人生理念：知行合一 简介 一张千万级的数据表，删除了一半的数据，你觉得B+树索引文件会不会变小？ （答案在文章中！！） 我们先来做个实验，看看表的大小是如何变化的？？ 做个实验，让数据说话 1、..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-03-30T09:38:40.000Z"}],["meta",{"property":"article:modified_time","content":"2025-03-30T09:38:40.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"一张千万级的数据表，删除了一半的数据，你觉得B+树索引文件会不会变小？\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-03-30T09:38:40.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"老马啸西风\\",\\"url\\":\\"https://houbb.github.io\\"}]}"]]},"git":{"createdTime":1743327520000,"updatedTime":1743327520000,"contributors":[{"name":"houbb","username":"houbb","email":"houbinbin.echo@gmail.com","commits":1,"url":"https://github.com/houbb"}]},"readingTime":{"minutes":6.27,"words":1880},"filePathRelative":"posts/interview/middleware/mysql/一张千万级的数据表，删除了一半的数据，你觉得B+树索引文件会不会变小？.md","localizedDate":"2025年3月30日","excerpt":"\\n<blockquote>\\n<p>作者：老马<br>\\n<br>公众号：老马啸西风<br>\\n<br> 博客：<a href=\\"https://houbb.github.io/\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">https://houbb.github.io/</a><br>\\n<br> 人生理念：知行合一</p>\\n</blockquote>\\n<h2>简介</h2>\\n<p>一张千万级的数据表，删除了一半的数据，你觉得B+树索引文件会不会变小？</p>\\n<div align=\\"left\\">\\n    <img src=\\"/images/middleware/mysql/13-1.png\\" width=\\"500px\\">\\n</div>","autoDesc":true}');export{A as comp,k as data};
