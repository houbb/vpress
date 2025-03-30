import{_ as i}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as r,a as s,o as a}from"./app-NomDibRt.js";const l={};function t(n,e){return a(),r("div",null,e[0]||(e[0]=[s('<h1 id="redis-缓存那点破事-单线程、数据类型、淘汰机制、集群模式" tabindex="-1"><a class="header-anchor" href="#redis-缓存那点破事-单线程、数据类型、淘汰机制、集群模式"><span>Redis 缓存那点破事 ！单线程、数据类型、淘汰机制、集群模式</span></a></h1><blockquote><p>作者：老马<br><br>公众号：老马啸西风<br><br> 博客：<a href="https://houbb.github.io/" target="_blank" rel="noopener noreferrer">https://houbb.github.io/</a><br><br> 人生理念：知行合一</p></blockquote><h2 id="为什么这么快" tabindex="-1"><a class="header-anchor" href="#为什么这么快"><span><strong>为什么这么快？</strong><br><br></span></a></h2><p>答案：</p><ul><li>完全基于内存，没有磁盘IO上的开销，异步持久化除外</li><li>单线程，避免多个线程上下文切换的性能损耗</li><li>非阻塞的IO多路复用机制，采用epoll的非阻塞IO，提升了效率</li><li>底层的存储结构优化，使用原生的数据结构提升性能。</li></ul><h2 id="为什么采用单线程" tabindex="-1"><a class="header-anchor" href="#为什么采用单线程"><span><strong>为什么采用单线程？</strong><br><br></span></a></h2><p>答案：<br>官方回复，CPU不会成为Redis的制约瓶颈，Redis主要受内存、网络限制。例如，在一个普通的 Linux 系统上，使用pipelining 可以每秒传递 100 万个请求，所以如果您的应用程序主要使用 O(N) 或 O(log(N)) 命令，则几乎不会使用太多 CPU，属于IO密集型系统。</p><h2 id="redis-6-0-后改为多线程" tabindex="-1"><a class="header-anchor" href="#redis-6-0-后改为多线程"><span><strong>Redis 6.0 后改为多线程?</strong><br><br></span></a></h2><p>答案：<br>Redis的多线程主要是处理数据的读写、协议解析。执行命令还是采用单线程顺序执行。<br>之所以引入多线程主要是因为redis的性能瓶颈在于网络IO而非CPU，使用多线程进行一些周边预处理，提升了IO的读写效率，从而提高了整体的吞吐量。antirez 在 RedisConf 2019 分享时提到，Redis 6 引入的多线程 IO 对性能提升至少一倍以上。</p><h2 id="redis-有哪些特性" tabindex="-1"><a class="header-anchor" href="#redis-有哪些特性"><span><strong>Redis 有哪些特性？</strong><br><br></span></a></h2><p>答案：</p><ul><li>性能高， 读的速度是100000次/s，写的速度是80000次/s</li><li>数据持久化，支持RDB 、AOF</li><li>支持事务。通过MULTI和EXEC指令包起来。</li><li>多种数据结构类型</li><li>主从复制</li><li>其他特性：发布/订阅、通知、key过期等</li></ul><h2 id="应用场景" tabindex="-1"><a class="header-anchor" href="#应用场景"><span><strong>应用场景</strong><br><br></span></a></h2><p>答案：</p><ul><li>1、热点数据缓存，有句话说的好，「性能不够，缓存来凑」</li><li>2、分布式锁，利用 Redis 的 setnx</li><li>3、分布式 session</li><li>4、计数器，通过incr命令</li><li>5、排行榜，Redis 的 有序集合</li><li>6、点赞列表</li><li>7、其他</li></ul><h2 id="八种-数据类型" tabindex="-1"><a class="header-anchor" href="#八种-数据类型"><span><strong>八种 数据类型？</strong></span></a></h2><p>答案：<br>五种常用数据类型：<code>String</code>、<code>Hash</code>、<code>Set</code>、<code>List</code>、<code>SortedSet</code>。<br>三种特殊的数据类型：<code>Bitmap</code>、<code>HyperLogLog</code>、<code>Geospatial</code>，其中 Bitmap 、HyperLogLog 的底层都是 String 数据类型，Geospatial 底层是 Sorted Set 数据类型。</p><p><strong>五种基本数据类型:</strong></p><ol><li><strong>String</strong>:字符串类型，常被用来存储计数器，粉丝数等，简单的分布式锁也会用到该类型</li><li><strong>Hash</strong>: key - value 形式的，value 是一个map</li><li><strong>List</strong>: 基本的数据类型，列表。在 Redis 中可以把 list 用作栈、队列、阻塞队列。</li><li><strong>Set</strong>: 集合，不能有重复元素，可以做点赞，收藏等</li><li><strong>SortedSet</strong>: 有序集合，不能有重复元素，有序集合中的每个元素都需要指定一个分数，根据分数对元素进行升序排序。可以做排行榜</li></ol><p><strong>三种特殊数据类型:</strong></p><ol><li><strong>Geospatial</strong>: Redis 在 3.2 推出 Geo 类型，该功能<strong>可以推算出地理位置信息，两地之间的距离</strong>。</li><li><strong>HyperLogLog</strong>: 基数：数学上集合的元素个数，是不能重复的。这个数据结构<strong>常用于统计网站的 UV</strong>。</li><li><strong>Bitmap</strong>: bitmap 就是通过最小的单位 bit 来进行0或者1的设置，表示某个元素对应的值或者状态。一个 bit 的值，或者是0，或者是1；也就是说一个 bit 能存储的最多信息是2。bitmap <strong>常用于统计用户信息比如活跃粉丝和不活跃粉丝、登录和未登录、是否打卡等</strong>。</li></ol><h2 id="底层存储数据结构" tabindex="-1"><a class="header-anchor" href="#底层存储数据结构"><span><strong>底层存储数据结构？</strong><br><br></span></a></h2><p>答案：</p><ul><li>字符串。没有采用C语言的传统字符串，而是自己实现的一个简单动态字符串SDS的抽象类型，并保存了长度信息。</li><li>链表（linkedlist）。双向无环链表结构，每个链表的节点由一个listNode结构来表示，每个节点都有前置和后置节点的指针</li><li>字典（hashtable）。保存键值对的抽象数据结构，底层使用hash表，每个字典带有两个hash表，供平时使用和rehash时使用。</li><li>跳跃表（skiplist）。跳跃表是有序集合的底层实现之一。redis跳跃表由zskiplist和zskiplistNode组成，zskiplist用于保存跳跃表 信息(表头、表尾节点、⻓度等)，zskiplistNode用于表示表跳跃节点，每个跳跃表的层高都是1- 32的随机数，在同一个跳跃表中，多个节点可以包含相同的分值，但是每个节点的成员对象必须是唯一的，节点按照分值大小排序，如果分值相同，则按照成员对象的大小排序。</li><li>整数集合（intset）。用于保存整数值的集合抽象数据结构，不会出现重复元素，底层实现为数组。</li><li>压缩列表（ziplist）。为节约内存而开发的顺序性数据结构，可以包含多个节点，每个节点可以保存一个字节数组或者整数值。</li></ul><p><strong>基础类型的底层存储：</strong></p><ul><li>字符串对象string：int整数、embstr 编码的简单动态字符串、raw简单动态字符串</li><li>列表对象list：linkedlist、ziplist</li><li>哈希对象hash：hashtable、ziplist</li><li>集合对象set：hashtable、intset</li><li>有序集合对象zset：skiplist、ziplist</li></ul><h2 id="常用5-种数据结构的应用场景" tabindex="-1"><a class="header-anchor" href="#常用5-种数据结构的应用场景"><span><strong>常用5 种数据结构的应用场景？</strong></span></a></h2><p>答案：</p><ul><li>String：缓存、计数器、分布式锁等</li><li>List：链表、队列、微博关注人时间轴列表等</li><li>Hash：用户信息、Hash 表等</li><li>Set：去重、赞、踩、共同好友等</li><li>Zset：访问量排行榜、点击量排行榜等</li></ul><h2 id="过期-key-的删除策略" tabindex="-1"><a class="header-anchor" href="#过期-key-的删除策略"><span><strong>过期 Key 的删除策略？</strong></span></a></h2><p>答案：<br>有3种过期删除策略。惰性删除、定期删除、定时删除<br>1、惰性删除。使用key时才进行检查，如果已经过期，则删除。缺点：过期的key如果没有被访问到，一直无法删除，一直占用内存，造成空间浪费。<br>2、定期删除。每隔一段时间做一次检查，删除过期的key，每次只是随机取一些key去检查。<br>3、定时删除。为每个key设置过期时间，同时创建一个定时器。一旦到期，立即执行删除。缺点：如果过期键比较多时，占用CPU较多，对服务的性能有很大影响。</p><h2 id="什么是定期删除" tabindex="-1"><a class="header-anchor" href="#什么是定期删除"><span>什么是定期删除？<br><br></span></a></h2><p>答案：<br>每隔一段时间，随机从数据库中取出一定数量的 Key 检查，并删除已经过期的 Key。<br><strong>处理过程：</strong><br>1、从过期字典中随机抽取 20 个 key；<br>2、检查这 20 个 key 是否过期，并删除已过期的 key；<br>3、如果过期 key 的占比超过 25%，也就是超过 5 个（20 * 25%），则继续重复步骤 1。如果已过期的比例小于 25%，则停止本次任务，然后等待下一轮再检查。</p><div class="hint-container info"><p class="hint-container-title">相关信息</p><p>定期删除是一个无限循环过程，为了避免循环过度，导致线程卡死，Redis 增加了定期删除循环流程的时间上限，默认不会超过 25ms。</p></div><h2 id="内存淘汰策略" tabindex="-1"><a class="header-anchor" href="#内存淘汰策略"><span><strong>内存淘汰策略？</strong><br><br></span></a></h2><p>答案：<br>当Redis的内存超过最大允许的内存之后，Redis 会触发内存淘汰策略，删除一些不常用的数据，以保证Redis 服务器的正常运行。<br><strong>1、不进行数据淘汰</strong></p><ul><li><strong>noeviction（Redis3.0之后，默认的内存淘汰策略）</strong>：禁止淘汰数据。当内存达到阈值的时候，新写入操作报错</li></ul><p><strong>2、对设置了「过期时间」的数据淘汰：</strong></p><ul><li><strong>volatile-random</strong>：随机淘汰设置了过期时间的任意键值；</li><li><strong>volatile-ttl</strong>：从已设置过期时间的key中，移出即将要过期的key</li><li><strong>volatile-lru</strong>（Redis3.0 之前，默认的内存淘汰策略）：所有设置过期时间的键值中，最久未使用的键值；</li><li><strong>volatile-lfu</strong>（Redis 4.0 后新增的内存淘汰策略）：所有设置过期时间的键值中，最少使用的键值；</li></ul><p><strong>3、所有数据范围内淘汰：</strong></p><ul><li><strong>allkeys-random</strong>：随机淘汰任意键值;</li><li><strong>allkeys-lru</strong>：淘汰整个键值中最久未使用的键值；</li><li><strong>allkeys-lfu</strong>（Redis 4.0 后新增的内存淘汰策略）：淘汰整个键值中最少使用的键值。</li></ul><blockquote><p>内存淘汰策略可以通过配置文件来修改，Redis.conf 对应的配置项是 maxmemory-policy 修改对应的值就行，默认是 no-eviction</p></blockquote><h2 id="redis-突然挂了怎么解决" tabindex="-1"><a class="header-anchor" href="#redis-突然挂了怎么解决"><span><strong>Redis 突然挂了怎么解决？</strong><br><br></span></a></h2><p>答案：</p><ol><li>从系统可用性角度思考，Redis Cluster引入主备机制，当主节点挂了后，自动切换到备用节点，继续提供服务。</li><li>Client端引入本地缓存，通过开关切换，避免Redis突然挂掉，高并发流量把数据库打挂。</li></ol><h2 id="持久化机制" tabindex="-1"><a class="header-anchor" href="#持久化机制"><span><strong>持久化机制？</strong><br><br></span></a></h2><p>答案：<br>1、快照RDB。将某个时间点上的数据库状态保存到<code>RDB文件</code>中，RDB文件是一个压缩的二进制文件，保存在磁盘上。当Redis崩溃时，可用于恢复数据。通过<code>SAVE</code>或<code>BGSAVE</code>来生成RDB文件。</p><ul><li>SAVE：会阻塞redis进程，直到RDB文件创建完毕，在进程阻塞期间，redis不能处理任何命令请求。</li><li>BGSAVE：会 fork 出一个子进程，然后由子进程去负责生成RDB文件，父进程还可以继续处理命令请求，不会阻塞进程。</li></ul><p>2、只追加文件AOF。以日志的形式记录每个写操作（非读操作）。当不同节点同步数据时，读取日志文件的内容将写指令从前到后执行一次，即可完成数据恢复。</p><h2 id="rdb-优缺点" tabindex="-1"><a class="header-anchor" href="#rdb-优缺点"><span>RDB 优缺点？</span></a></h2><p>答案：<br>把某个时间点 redis 内存中的数据以二进制的形式存储的一个.rdb为后缀的文件当中，也就是「周期性的备份redis中的整个数据」，这是redis默认的持久化方式，也就是我们说的快照(snapshot)，是采用 fork 子进程的方式来写时同步的。<br><strong>优点：</strong></p><ul><li>将某一时间点redis内的所有数据保存下来，当我们做「大型的数据恢复时，RDB的恢复速度会很快」</li><li>由于RDB的FROK子进程这种机制，对客户端提供读写服务的影响会非常小</li></ul><p><strong>缺点：</strong></p><ul><li>举个例子假设我们定时5分钟备份一次，在10:00的时候 redis 备份了数据，但是如果在10:04的时候服务挂了，那么我们就会丢失在10:00到10:04的整个数据</li><li>1:「有可能会产生长时间的数据丢失」</li><li>2:可能会有长时间停顿：我们前面讲了，fork 子进程这个过程是和 redis 的数据量有很大关系的，如果「数据量很大,那么很有可能会使redis暂停几秒</li></ul><h2 id="什么时候触发-rdb-机制" tabindex="-1"><a class="header-anchor" href="#什么时候触发-rdb-机制"><span>什么时候触发 RDB 机制？</span></a></h2><p>答案：<br>1、通过配置文件，设置一定时间后自动执行RDB<br>2、如采用主从复制过程，会自动执行RDB<br>3、Redis 执行shutdown时，在未开启AOF后会执行RDB</p><h2 id="什么是-aof" tabindex="-1"><a class="header-anchor" href="#什么是-aof"><span><strong>什么是 AOF？</strong><br><br></span></a></h2><p>答案：<br>AOF 通过日志，对数据的写入修改操作进行记录。这种持久化方式实时性更好。通过配置文件打开AOF</p><h2 id="aof-持久化策略" tabindex="-1"><a class="header-anchor" href="#aof-持久化策略"><span>AOF 持久化策略？</span></a></h2><p>答案：<br>1、always：每执行一次数据修改命令就将其命令写入到磁盘日志文件上。<br>2、everysec：每秒将命令写入到磁盘日志文件上。<br>3、no：不主动设置，由操作系统决定什么时候写入到磁盘日志文件上。</p><h2 id="aof-优缺点" tabindex="-1"><a class="header-anchor" href="#aof-优缺点"><span>AOF 优缺点？<br><br></span></a></h2><p>答案：<br><strong>优点：</strong></p><ul><li>AOF可以「更好的保护数据不丢失」，一般AOF会以每隔1秒，通过后台的一个线程去执行一次fsync操作，如果redis进程挂掉，最多丢失1秒的数据</li><li>AOF是将命令直接追加在文件末尾的，写入性能非常高</li><li>AOF日志文件的命令通过非常可读的方式进行记录，这个非常「适合做灾难性的误删除紧急恢复」，如果某人不小心用 flushall 命令清空了所有数据，只要这个时候还没有执行 rewrite，那么就可以将日志文件中的 flushall 删除，进行恢复</li></ul><p><strong>缺点</strong>:</p><ul><li>对于同一份数据源来说，一般情况下AOF 文件比 RDB 数据快照要大</li><li>由于 .aof 的每次命令都会写入，那么相对于 RDB 来说「需要消耗的性能也就更多」，当然也会有 aof 重写将 aof 文件优化。</li><li>数据恢复比较慢，不适合做冷备。</li></ul><h2 id="redis-有哪些集群部署方案" tabindex="-1"><a class="header-anchor" href="#redis-有哪些集群部署方案"><span>Redis 有哪些集群部署方案？</span></a></h2><p>答案：<br>1、主从复制<br>2、Sentinel（哨兵）模式<br>3、Redis Cluster 集群模式</p><h2 id="redis-主从数据同步" tabindex="-1"><a class="header-anchor" href="#redis-主从数据同步"><span><strong>Redis 主从数据同步？</strong><br><br></span></a></h2><p>答案：</p><ul><li>1、slave启动后，向master发送sync命令</li><li>2、master收到sync之后，执行bgsave保存快照，生成RDB全量文件</li><li>3、master把slave的写命令记录到缓存</li><li>4、bgsave执行完毕之后，发送RDB文件到slave，slave执行</li><li>5、master发送缓冲区的写命令给slave，slave接收命令并执行，完成复制初始化。</li><li>6、此后，master每次执行一个写命令都会同步发送给slave，保持master与slave之间数据的一致性</li></ul><h2 id="主从复制的优缺点" tabindex="-1"><a class="header-anchor" href="#主从复制的优缺点"><span><strong>主从复制的优缺点？</strong><br><br></span></a></h2><p>答案：<br><strong>优点：</strong></p><ul><li>master能自动将数据同步到slave，可以进行读写分离，分担master的读压力</li><li>master、slave之间的同步是以非阻塞的方式进行的，同步期间，客户端仍然可以提交查询或更新请求</li></ul><p><strong>缺点：</strong></p><ul><li>不具备自动容错与恢复功能，master 节点宕机后，需要手动指定新的 master</li><li>master宕机，如果宕机前数据没有同步完，则切换IP后会存在数据不一致的问题</li><li>难以支持在线扩容，Redis 的容量受限于单机配置</li></ul><h2 id="sentinel-哨兵-模式的优缺点" tabindex="-1"><a class="header-anchor" href="#sentinel-哨兵-模式的优缺点"><span><strong>Sentinel（哨兵）模式的优缺点？</strong></span></a></h2><p>答案：<br>哨兵模式基于主从复制模式，增加了<strong>哨兵来监控</strong>与<strong>自动处理故障</strong>。<br><strong>优点</strong>：</p><ul><li>哨兵模式基于主从复制模式，所以主从复制模式有的优点，哨兵模式也有</li><li>master 挂掉可以自动进行切换，系统可用性更高</li></ul><p><strong>缺点：</strong></p><ul><li>Redis 的容量受限于单机配置</li><li>需要额外的资源来启动sentinel进程</li></ul><h2 id="sentinel-哨兵-的选举过程" tabindex="-1"><a class="header-anchor" href="#sentinel-哨兵-的选举过程"><span><strong>Sentinel（哨兵）的选举过程？</strong></span></a></h2><p>答案：</p><ul><li>1、第一个发现该master挂了的哨兵，向每个哨兵发送命令，让对方选举自己成为领头哨兵</li><li>2、其他哨兵如果没有选举过他人，就会将这一票投给第一个发现该master挂了的哨兵</li><li>3、第一个发现该master挂了的哨兵如果发现由超过一半哨兵投给自己，并且其数量也超过了设定的quoram参数，那么该哨兵就成了领头哨兵</li><li>4、如果多个哨兵同时参与这个选举，那么就会重复该过程，知道选出一个领头哨兵</li><li>5、选出领头哨兵后，就开始了故障修复，会从选出一个从数据库作为新的master</li></ul><h2 id="redis-cluster-模式的优缺点" tabindex="-1"><a class="header-anchor" href="#redis-cluster-模式的优缺点"><span><strong>Redis Cluster 模式的优缺点？</strong></span></a></h2><p>答案：<br>实现了Redis的分布式存储，即每台节点存储不同的内容，来解决在线扩容的问题。<br><strong>优点：</strong></p><ul><li>无中心架构，数据按照slot分布在多个节点</li><li>集群中的每个节点都是平等的，每个节点都保存各自的数据和整个集群的状态。每个节点都和其他所有节点连接，而且这些连接保持活跃，这样就保证了我们只需要连接集群中的任意一个节点，就可以获取到其他节点的数据。</li><li>可线性扩展到1000多个节点，节点可动态添加或删除</li><li>能够实现自动故障转移，节点之间通过gossip协议交换状态信息，用投票机制完成slave到master的角色转换</li></ul><p><strong>缺点：</strong></p><ul><li>数据通过异步复制，不保证数据的强一致性</li><li>slave充当 “冷备”，不对外提供读、写服务，只作为故障转移使用。</li><li>批量操作限制，目前只支持具有相同slot值的key执行批量操作，对mset、mget、sunion等操作支持不友好</li><li>key事务操作支持有限，只支持多key在同一节点的事务操作，多key分布在不同节点时无法使用事务功能</li><li>不支持多数据库空间，一台redis可以支持16个db，集群模式下只能使用一个，即db 0。Redis Cluster模式不建议使用pipeline和multi-keys操作，减少max redirect产生的场景。</li></ul><h2 id="redis-如何做扩容" tabindex="-1"><a class="header-anchor" href="#redis-如何做扩容"><span><strong>Redis 如何做扩容？</strong><br><br></span></a></h2><p>答案：<br>为了避免数据迁移失效，通常使用<code>一致性哈希</code>实现动态扩容缩容，有效减少需要迁移的Key数量。<br>但是Cluster 模式，采用固定Slot槽位方式（16384个），对每个key计算CRC16值，然后对16384取模，然后根据slot值找到目标机器，扩容时，我们只需要迁移一部分的slot到新节点即可。</p><h2 id="redis-的集群原理" tabindex="-1"><a class="header-anchor" href="#redis-的集群原理"><span><strong>Redis 的集群原理?</strong><br><br></span></a></h2><p>答案：<br>一个redis集群由多个节点node组成，而多个node之间通过cluster meet命令来进行连接，组成一个集群。<br>数据存储通过分片的形式，整个集群分成了<code>16384</code>个slot，每个节点负责一部分槽位。整个槽位的信息会同步到所有节点中。<br>key与slot的映射关系：</p><ul><li>健值对 key，进行 CRC16 计算，计算出一个 16 bit 的值</li><li>将 16 bit 的值对 16384 取模，得到 0 ～ 16383 的数表示 key 对应的哈希槽</li></ul><h2 id="redis-如何做到高可用" tabindex="-1"><a class="header-anchor" href="#redis-如何做到高可用"><span><strong>Redis 如何做到高可用？</strong><br><br></span></a></h2><p>答案：<br>哨兵机制。具有自动故障转移、集群监控、消息通知等功能。<br>哨兵可以同时监视所有的主、从服务器，当某个master下线时，自动提升对应的slave为master，然后由新master对外提供服务。</p><h2 id="什么是-redis-事务" tabindex="-1"><a class="header-anchor" href="#什么是-redis-事务"><span><strong>什么是 Redis 事务？</strong><br><br></span></a></h2><p>答案：<br>Redis事务是一组命令的集合，将多个命令打包，然后把这些命令按顺序添加到队列中，并且按顺序执行这些命令。<br>Redis事务中没有像Mysql关系型数据库事务隔离级别的概念，不能保证原子性操作，也没有像Mysql那样执行事务失败会进行回滚操作</p><h2 id="redis-事务执行流程" tabindex="-1"><a class="header-anchor" href="#redis-事务执行流程"><span><strong>Redis 事务执行流程？</strong><br><br></span></a></h2><p>答案：<br>通过<code>MULTI</code>、<code>EXEC</code>、<code>WATCH</code>等命令来实现事务机制，事务执行过程将一系列多个命令按照顺序一次性执行，在执行期间，事务不会被中断，也不会去执行客户端的其他请求，直到所有命令执行完毕。<br>具体过程：</p><ul><li>服务端收到客户端请求，事务以<code>MULTI</code>开始</li><li>如果正处于事务状态时，则会把后续命令放入队列同时返回给客户端<code>QUEUED</code>，反之则直接执行这 个命令</li><li>当收到客户端的<code>EXEC</code>命令时，才会将队列里的命令取出、顺序执行，执行完将当前状态从事务状态改为非事务状态</li><li>如果收到 <code>DISCARD</code> 命令，放弃执行队列中的命令，可以理解为Mysql的回滚操作，并且将当前的状态从事务状态改为非事务状态</li></ul><blockquote><p>WATCH 监视某个key，该命令只能在MULTI命令之前执行。如果监视的key被其他客户端修改，EXEC将会放弃执行队列中的所有命令。UNWATCH 取消监视之前通过WATCH 命令监视的key。通过执行EXEC 、DISCARD 两个命令之前监视的key也会被取消监视。</p></blockquote><h2 id="hashtag-解决什么问题" tabindex="-1"><a class="header-anchor" href="#hashtag-解决什么问题"><span>hashtag 解决什么问题？</span></a></h2><p>答案：<br>单实例上的mset、lua脚本等处理多key时，是一个原子性(atomic)操作。集群每次通过对key进行hash计算到不同的分片，所以集群上同时执行多个key，不再是原子性操作，其原因是需要设置的多个key可能分配到不同的机器上。因此集群引入了<code>hashtag</code>来对多key同时操作，在设置了hashtag的情况下，集群会根据hashtag决定key分配的slot， 当两个key拥有相同的<code>hashtag</code>时, 它们会被分配到同一个slot。</p><blockquote><p>用法：<br> 使用{}大括号，指定key只计算大括号内字符串的哈希，从而将不同key的键插入到同一个哈希槽。</p></blockquote><h2 id="redis-与-guava-、caffeine-有什么区别" tabindex="-1"><a class="header-anchor" href="#redis-与-guava-、caffeine-有什么区别"><span><strong>Redis 与 Guava 、Caffeine 有什么区别？</strong></span></a></h2><p>答案：<br>缓存分为本地缓存和分布式缓存。<br><strong>1、Caffeine、Guava，属于本地缓存</strong><br>特点：</p><ul><li>直接访问内存，速度快，受内存限制，无法进行大数据存储。</li><li>无网络通讯开销，性能更高。</li><li>只支持本地应用进程访问，同步更新所有节点的本地缓存数据成本较高。</li><li>应用进程重启，数据会丢失。</li></ul><div class="hint-container info"><p class="hint-container-title">相关信息</p><p>所以，本地缓存适合存储一些不易改变或者低频改变的高热点数据。</p></div><p><strong>2、Redis 属于分布式缓存</strong><br>特点：</p><ul><li>集群模式，支持大数据量存储</li><li>数据集中存储，保证数据的一致性</li><li>数据跨网络传输，性能低于本地缓存。但同一个机房，两台服务器之间请求跑一个来回也就需要500微秒，比起其优势，这点损耗完全可以忽略，这也是分布式缓存受欢迎的原因。</li><li>支持副本机制，有效的保证了高可用性。</li></ul><h2 id="缓存集中失效如何解决" tabindex="-1"><a class="header-anchor" href="#缓存集中失效如何解决"><span>缓存集中失效如何解决？</span></a></h2><p>答案：<br>当业务系统查询数据时，首先会查询缓存，如果缓存中数据不存在，然后查询DB再将数据预热到Cache中，并返回。缓存的性能比 DB 高 50~100 倍以上。<br>很多业务场景，如：秒杀商品、微博热搜排行、或者一些活动数据，都是通过跑任务方式，将DB数据批量、集中预热到缓存中，缓存数据有着近乎相同的过期时间。<br>当过这批数据过期时，会一起过期，此时，对这批数据的所有请求，都会出现缓存失效，从而将压力转嫁到DB，DB的请求量激增，压力变大，响应开始变慢。<br><strong>那么有没有解呢？</strong><br>当然有了。<br>我们可以从缓存的过期时间入口，将原来的固定过期时间，调整为过期时间=基础时间+随机时间，让缓存慢慢过期，避免瞬间全部过期，对DB产生过大压力。</p><h2 id="缓存穿透如何解决" tabindex="-1"><a class="header-anchor" href="#缓存穿透如何解决"><span>缓存穿透如何解决？<br><br></span></a></h2><p>答案:<br>不是所有的请求都能查到数据，不论是从缓存中还是DB中。<br>假如黑客攻击了一个论坛，用了一堆肉鸡访问一个不存的帖子id。按照常规思路，每次都会先查缓存，缓存中没有，接着又查DB，同样也没有，此时不会预热到Cache中，导致每次查询，都会cache miss。<br>由于DB的吞吐性能较差，会严重影响系统的性能，甚至影响正常用户的访问。<br><strong>解决方案：</strong></p><ul><li>方案一：查存DB 时，如果数据不存在，预热一个特殊空值到缓存中。这样，后续查询都会命中缓存，但要对特殊值，解析处理。</li><li>方案二：构造一个布隆过滤器 BloomFilter ，初始化全量数据，当接到请求时，在BloomFilter 中判断这个key是否存在，如果不存在，直接返回即可，无需再查询缓存和 DB</li><li>方案三：在数据库访问前进行校验，对不合法的请求直接 return</li></ul><h2 id="缓存雪崩如何解决" tabindex="-1"><a class="header-anchor" href="#缓存雪崩如何解决"><span>缓存雪崩如何解决？</span></a></h2><p>答案：<br>缓存雪崩是指部分缓存节点不可用，进而导致整个缓存体系甚至服务系统不可用的情况。<br>分布式缓存设计一般选择一致性Hash，当有部分节点异常时，采用 rehash 策略，即把异常节点请求平均分散到其他缓存节点。但是，当较大的流量洪峰到来时，如果大流量 key 比较集中，正好在某 1～2 个缓存节点，很容易将这些缓存节点的内存、网卡过载，缓存节点异常 Crash，然后这些异常节点下线，这些大流量 key 请求又被 rehash 到其他缓存节点，进而导致其他缓存节点也被过载 Crash，缓存异常持续扩散，最终导致整个缓存体系异常，无法对外提供服务。</p><p><strong>解决方案：</strong></p><ul><li>方案一：增加实时监控，及时预警。通过机器替换、各种故障自动转移策略，快速恢复缓存对外的服务能力</li><li>方案二：缓存增加多个副本，当缓存异常时，再读取其他缓存副本。为了保证副本的可用性，尽量将多个缓存副本部署在不同机架上，降低风险。</li><li>方案三：设置热点数据永远不过期</li><li>方案四：采用多级缓存，分层扛压</li><li>方案五：缓存数据的过期时间随机，防止同一时间大量数据集中过期。</li></ul><h2 id="缓存热点如何解决" tabindex="-1"><a class="header-anchor" href="#缓存热点如何解决"><span>缓存热点如何解决？<br><br></span></a></h2><p>答案<br><strong>方案一：</strong></p><ul><li>首先能先找到这个热key来，比如通过Spark实时流分析，及时发现新的热点key。</li><li>将集中化流量打散，避免一个缓存节点过载。由于只有一个key，我们可以在key的后面拼上有序编号，比如key#01、key#02。。。key#10多个副本，这些加工后的key位于多个缓存节点上。</li><li>每次请求时，客户端随机访问一个即可</li></ul><div class="hint-container info"><p class="hint-container-title">相关信息</p><p>可以设计一个缓存服务治理管理后台，实时监控缓存的SLA，并打通分布式配置中心，对于一些 hot key可以快速、动态扩容。</p></div><p><strong>方案二：</strong></p><ul><li>可以将结果缓存到本地内存中</li></ul><h2 id="缓存-key-过大如何解决" tabindex="-1"><a class="header-anchor" href="#缓存-key-过大如何解决"><span>缓存 key 过大如何解决？</span></a></h2><p>答案：<br>当访问缓存时，如果key对应的value过大，读写、加载很容易超时，容易引发网络拥堵。另外缓存的字段较多时，每个字段的变更都会引发缓存数据的变更，频繁的读写，导致慢查询。如果大key过期被缓存淘汰失效，预热数据要花费较多的时间，也会导致慢查询。<br>所以我们在设计缓存的时候，要注意缓存的粒度，既不能过大，如果过大很容易导致网络拥堵；也不能过小，如果太小，查询频率会很高，每次请求都要查询多次。<br><strong>解决方案：</strong></p><ul><li>方案一：设置一个阈值，当value的长度超过阈值时，对内容启动压缩，降低kv的大小</li><li>方案二：评估大key所占的比例，由于很多框架采用池化技术，如：Memcache，可以预先分配大对象空间。真正业务请求时，直接拿来即用。</li><li>方案三：颗粒划分，将大key拆分为多个小key，独立维护，成本会降低不少</li><li>方案四：大key要设置合理的过期时间，尽量不淘汰那些大key</li></ul><h2 id="缓存更新策略" tabindex="-1"><a class="header-anchor" href="#缓存更新策略"><span><strong>缓存更新策略？</strong><br><br></span></a></h2><p>答案：<br>1、Cache Aside</p><ul><li>写操作：通常会先更新数据库，然后再删除缓存，为了兜底还会设置缓存时间。</li><li>读操作：读取数据如果没有命中缓存，则从数据库加载数据，并预热到缓存中，然后返回给用户。</li><li>Cache Aside 策略适合读多写少的场景。</li></ul><p>2、Read/Write Through</p><ul><li>Read Through：先查询缓存中数据是否存在，如果存在则直接返回。如果不存在，则由缓存组件负责从DB 加载数据，并将结果写入到缓存组件，最后缓存组件将数据返回给应用。</li><li>Write Through：如果缓存中数据已经存在，则更新缓存中的数据，并且由缓存组件同步更新到数据库中，然后缓存组件告知应用程序更新完成。如果缓存中数据不存在，直接更新数据库，然后返回；</li><li>一般是由一个 Cache Provider 对外提供读写操作，应用程序不用感知操作的是缓存还是数据库。</li></ul><p>3、Write Back</p><ul><li>延迟写入，更新数据的时候，只更新缓存，同时将缓存数据设置为脏的，然后立马返回。对于数据库的更新，通过批量异步的方式进行。</li><li>Cache Provider 每隔一段时间会批量写入数据库，大大提升写的效率。如：CPU 缓存、操作系统的<code>page cache</code>也是类似机制。</li><li>适合写多的场景。</li></ul><h2 id="缓存不一致的解决方案" tabindex="-1"><a class="header-anchor" href="#缓存不一致的解决方案"><span><strong>缓存不一致的解决方案?</strong></span></a></h2><p>答案：<br>1、针对Cache Aside 模式，采用延迟双删策略，即先删除缓存数据，再更新数据库，再删除缓存数据<br>2、针对Read/Write Through 模式，采用将更新步骤放到消息队列中，异步执行，或针对MySQL+ redis这种结构，采用开源框架canal等，伪装成Mysql从节点，将其更新数据异步让redis执行。</p><h2 id="redis-与-memcache-区别" tabindex="-1"><a class="header-anchor" href="#redis-与-memcache-区别"><span><strong>Redis 与 Memcache 区别</strong><br><br></span></a></h2><p>答案：<br>1、Redis 采用单线程模型，而 Memcache采用多线程异步IO的方式<br>2、Redis 支持数据持久化，Memcache 不支持<br>3、Redis 支持的数据格式比 Memcache 更多</p><h2 id="redis-缓存七大经典问题" tabindex="-1"><a class="header-anchor" href="#redis-缓存七大经典问题"><span><strong>Redis 缓存七大经典问题？</strong><br><br></span></a></h2><p>答案：<br>列举了亿级系统，高访问量情况下Redis缓存可能会遇到哪些问题？以及对应的解决方案。<br>1、缓存集中失效<br>2、缓存穿透<br>3、缓存雪崩<br>4、缓存热点<br>5、缓存大Key<br>6、缓存数据的一致性<br>7、数据并发竞争预热<br>详细解决方案，请查看 <a href="https://mp.weixin.qq.com/s?__biz=Mzg2NzYyNjQzNg==&amp;mid=2247484947&amp;idx=1&amp;sn=5a70f88fba83b435b8144bf1ddd3cc9f&amp;scene=21#wechat_redirect" target="_blank" rel="noopener noreferrer">亿级系统的Redis缓存如何设计？？？</a></p><h2 id="如何实现一个分布式锁" tabindex="-1"><a class="header-anchor" href="#如何实现一个分布式锁"><span><strong>如何实现一个分布式锁？</strong></span></a></h2><p>答案：<br>1、数据库表，性能比较差<br>2、使用Lua脚本 (包含 SETNX + EXPIRE 两条指令)<br>3、SET的扩展命令（SET key value [EX][PX] [NX|XX]）<br>4、Redlock 框架<br>5、Zookeeper Curator框架提供了现成的分布式锁</p>',143)]))}const h=i(l,[["render",t]]),p=JSON.parse('{"path":"/posts/interview/interview/tech/Redis%20%E7%BC%93%E5%AD%98%E9%82%A3%E7%82%B9%E7%A0%B4%E4%BA%8B.html","title":"第七篇：Redis 缓存 ！单线程、数据类型、淘汰机制、集群模式","lang":"zh-CN","frontmatter":{"title":"第七篇：Redis 缓存 ！单线程、数据类型、淘汰机制、集群模式","description":"Redis 缓存那点破事 ！单线程、数据类型、淘汰机制、集群模式 作者：老马 公众号：老马啸西风 博客：https://houbb.github.io/ 人生理念：知行合一 为什么这么快？ 答案： 完全基于内存，没有磁盘IO上的开销，异步持久化除外 单线程，避免多个线程上下文切换的性能损耗 非阻塞的IO多路复用机制，采用epoll的非阻塞IO，提升了效...","head":[["meta",{"property":"og:url","content":"https://houbb.github.io/vpress/posts/interview/interview/tech/Redis%20%E7%BC%93%E5%AD%98%E9%82%A3%E7%82%B9%E7%A0%B4%E4%BA%8B.html"}],["meta",{"property":"og:site_name","content":"老马啸西风"}],["meta",{"property":"og:title","content":"第七篇：Redis 缓存 ！单线程、数据类型、淘汰机制、集群模式"}],["meta",{"property":"og:description","content":"Redis 缓存那点破事 ！单线程、数据类型、淘汰机制、集群模式 作者：老马 公众号：老马啸西风 博客：https://houbb.github.io/ 人生理念：知行合一 为什么这么快？ 答案： 完全基于内存，没有磁盘IO上的开销，异步持久化除外 单线程，避免多个线程上下文切换的性能损耗 非阻塞的IO多路复用机制，采用epoll的非阻塞IO，提升了效..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-03-30T09:38:40.000Z"}],["meta",{"property":"article:modified_time","content":"2025-03-30T09:38:40.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"第七篇：Redis 缓存 ！单线程、数据类型、淘汰机制、集群模式\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-03-30T09:38:40.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"老马啸西风\\",\\"url\\":\\"https://houbb.github.io\\"}]}"]]},"git":{"createdTime":1743327520000,"updatedTime":1743327520000,"contributors":[{"name":"houbb","username":"houbb","email":"houbinbin.echo@gmail.com","commits":1,"url":"https://github.com/houbb"}]},"readingTime":{"minutes":26.18,"words":7853},"filePathRelative":"posts/interview/interview/tech/Redis 缓存那点破事.md","localizedDate":"2025年3月30日","excerpt":"\\n<blockquote>\\n<p>作者：老马<br>\\n<br>公众号：老马啸西风<br>\\n<br> 博客：<a href=\\"https://houbb.github.io/\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">https://houbb.github.io/</a><br>\\n<br> 人生理念：知行合一</p>\\n</blockquote>\\n<h2><strong>为什么这么快？</strong><br><br></h2>\\n<p>答案：</p>\\n<ul>\\n<li>完全基于内存，没有磁盘IO上的开销，异步持久化除外</li>\\n<li>单线程，避免多个线程上下文切换的性能损耗</li>\\n<li>非阻塞的IO多路复用机制，采用epoll的非阻塞IO，提升了效率</li>\\n<li>底层的存储结构优化，使用原生的数据结构提升性能。</li>\\n</ul>","autoDesc":true}');export{h as comp,p as data};
