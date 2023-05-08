import{_ as p,p as t,q as r,a1 as n}from"./framework-5866ffd3.js";const o={},s=n('<h1 id="区块链是什么" tabindex="-1"><a class="header-anchor" href="#区块链是什么" aria-hidden="true">#</a> 区块链是什么？</h1><p>前段时间，我看了一本书的前几节，叫《Web3.0：赋能数字经济新时代》,昨天，在看刘润老师的《商业通识30讲》，这两本书都讲解了“<strong>区块链是什么？</strong>”这个问题。</p><p>说实话，这个概念从08年到现在都已经15年了，期间我也似乎陆陆续续也接触过一些教程，尝试搞懂这个新兴的概念，但一直感觉自己没有彻底弄懂，包括现在，我也感觉自己对于一些里面的细节还是没有弄懂，不过虽然如此，还是感觉对于一些基础概念形成了自己的理解的。</p><p>但这个概念本身比较复杂，所以我一直不敢笃定自己理解的是否正确，我也没有找过老师，让他听着我的理解说去评判：“没错，就是/不是你理解的这样。”</p><p>所以我今天把它们写出来，让你去评判（如果你懂），当时，我这么说一方面是追求严谨的考虑，从我的视角里，我觉的我的理解逻辑大抵都是通顺的，因此，即使你不懂，也不必担心我会误人子弟，因为你可以自行对这些逻辑论述过程进行判断。</p><p>而且，我记得在看《生活大爆炸》的时候，记住了一句谢尔顿说过的令我印象深刻的台词，他当时似乎是在嘲笑莱昂纳德的知识水平，调侃让他去当老师，说：“<strong>就像人们说的，不懂，就去教。</strong>”</p><p>尽管谢尔顿的本意是讽刺，但这句话“<strong>不懂，就去教</strong>”可真是关于学习方法的真知灼见，我在写出来的时候，<strong>为了尽可能表述的清楚、逻辑通顺，就不得不再次整理和学习这些知识，以至于写出来后不存在明显的错漏之处。</strong></p><p>我先下个我对区块链的定义：</p><p>在下定义之前，因为这个事物的含义本身比较丰富，我们采用分点描述的方式：</p><ul><li>区块我们可以按字面意思通俗一点理解，就是一块一块的东西，块就是量词，一个区块其实是一个容器，既然是容器，就要装东西</li><li>区块里面装什么？装数据，数据就是数据，跟你平常存储的照片、视频、文字没什么区别，就是存在计算机上的、由比特、字节构成的数据。我感觉，你甚至可以把它理解为文件夹。</li><li>“链”是什么，链其实是描述了这些区块的组织关系，这跟我们在一个文件夹内放很多个文件夹不同——这些文件夹是并列关系——而区块之间在存储上存在前后关系，类似于生儿子，前一个生出后一个，一直生下去，这样一直生下去就会形成一条链条</li><li>它是刻意被设计成这个链式结构的，为什么我们先不讲，下定义时，我们先认识它的样子是怎么样的</li></ul><p>通过以上四点描述，不知道读者在脑中能否大概勾勒出一个这个事物的大概样子。</p><p>假设你已经勾勒出来了，那么我们再审视一下，这几点之中，有什么新鲜的设计吗？</p><p>存储数据、组织成区块，其实没什么新鲜的，我们现在也经常拍照片，然后把它们分门别类的放好，这里面最新鲜的就是这个“链”的设计，也就是说，设计者刻意希望这些区块具有这样的特性：<strong>你只能由前一个区块得到后一个区块，一旦前一个区块内存储的任何数据发生了改变，所得到的后一个区块都是不一样的，我们依然可以用生儿子的比喻，假设你父母的基因稍微改变一点，生出来的你肯定就很不一样了，接着，你再生出来的也就又跟原来你父母基因没改变时生出的你生出的儿子不一样。</strong></p><p>这意味着什么？这意味着，<strong>一旦数据被存储，它就不可以便篡改了。任何一个区块内的某个微小的数据改变，都会导致这个区块后面的整条链条都跟原来一样。</strong></p><p>因此，区块链的机制设计和这种机制自然附带的特性就是上面描述的这样，其实也并没有特别复杂。</p><p>在技术上，怎么实现这种链式呢？具有编程经验的同学应该都接触过这个技术，其实它就是利用我们高频使用的“<strong>散列函数</strong>”，在前端，常常用它来判断文件的版本一致性，即文件是否被修改过。</p><p>散列函数的特性就是，<strong>给定一个输入串，它会输出一个256位的数字，输入串中的任何一个内容的改变，都会导致输出串面目全非，毫无规律可循，计算机如果想通过输入反向推断出输入是什么，一共需要试2的256次方种可能性，这个数字是一个天文数字，以当前计算机的算力根本不可能短时间破解。</strong></p><p>总结一下，这里我们可以给区块链下一个定义了：<strong>人们希望设计出了一套按序存储数据、且数据不可篡改的机制，这套机制利用计算机的实现，就是区块链，它本质是一种数据的存储方案</strong>。</p><p>但光听上面的定义，其实还只知道它是一套技术机制，还没有跟具体的生活问题关联起来，但上面既然强调了它是人为刻意设计的，肯定是因为这种机制有很广泛的应用场景，我们结合它的特性稍加思索，便可得出结论：<strong>只要人们的需求是存储一些数据，且不希望这些数据有被任何人为修改的可能，我们就可以利用这套技术机制作为解决方案。</strong></p><p>所以我们就可以<strong>转化我们的思维，什么问题场景下，我们希望被记录的数据不会被更改</strong>？</p><p>一个显而易见，且跟我们生活息息相关的，就是“记账”这件事情。</p><p>这很好理解吧，人们的经济交易行为，发生一笔记一笔，几乎全人类都可以很容易达成这样的共识：“记好的账是不应该被修改的”。账如果可以乱改，那经济体系就崩溃了。</p><p>所以，比特币就是第一个对这个“区块链”技术有所应用的技术场景，先不管比特币怎么发行，怎么交易，在这里，把它理解为人民币就好，只要发生了人民币交易，我们就通过这种技术去记账。</p><p>传统的记账是谁来记的？是银行、支付宝、微信支付等中心化结构。</p><p>银行记账和这种区块链记账有区别吗？</p><p><strong>当然有，而且是本质区别</strong>。</p><p>银行记，数据的不可篡改是靠银行的信用背书来决定的，也就是大家相信银行，知道它不会乱来，但只要是人建立的机构，就是人类意志的体现，如果可以不相信，我相信人们还是愿意不去相信，相信它是因为目前它是我们所能得到的最优解，而且国家不会让他乱来，乱来社会就乱套了。</p><p>但通过区块链记，则是通过“数学”来保证数据的不可篡改，我想没有人会不相信数学的力量吧，它不受人为意志所干预。</p><p>好了，我想区块链讲到这里就讲清楚了，所以我们看出，区块链不等于比特币，区块链其实是是一种存储方案，而比特币是区块链这个技术在金融货币领域的运用之一，这个区块内的数据存什么，其实就是运用到什么领域，举个例子，美国总统大选需要投票，其实也可以用这个技术来实现，而且这个比人们去投票站投票靠谱多了，因为投票不可更改，且计算机统计数据易如反掌。</p><p>今天先讲这么多，其实还有很多没讲，比如说，如何打包区块？也就是我们靠什么依据来判断，满足什么条件的时候，就把指定的数据打包成区块？这个记好的账本虽然不可篡改，但是存储在谁家的计算机上？这些后面有机会再讲。</p>',30),e=[s];function g(a,i){return t(),r("div",null,e)}const c=p(o,[["render",g],["__file","6.html.vue"]]);export{c as default};
