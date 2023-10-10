## what's web3?

### 概念 concept

- 去中心化 decentralized
  开发去中心化应用，就是去建设一个大家相互信任，承诺必会兑现的世界。
  To develop decentralized application is to build a world where everyone trusts each other and promises are kept.
  基于区块链的设计理念，不同的社区将会在一个新的系统中，进行相互协作。
  Based on the design concept of blockchain, different communities will collaborate with each other in a new system.
  传统 app 中,如果主体崩了/恶意贿赂/关闭网站,they just can.

- what's bitcoin (white paper)
  https://zhuanlan.zhihu.com/p/142814536

- what's ethereum
  In addition to being a store of value for Bitcoin, Ethereum is also a platform for running decentralized contracts.

- hybird smart contract
  Combine 链上 decenteralized logic & 链下 decenteralized data and compute.
  is to solve the problem of contracts requiring real-wold data.

- chainlink
  it's the best in now of decenter seer neetwork. 预言机

### how blockchain works

- hash->block->blockchain->distribution blockchain-> signing
- signing
  私钥签署信息生成信息签名,私钥生成公钥，任何人可以使用公钥验证签名是否由你签的
  公钥生成唯一你的地址
- block
  区块创建机制取决于所使用的共识算法
  以太坊和比特币目前都使用工作量证明(proof of work)，ETH2 将使用权益证明。
  可能的攻击导致需要共识
  女巫攻击->伪造虚拟节点
  51%攻击->最大链条导致控制 区块链越大,51%攻击越困难
  工作量证明 poW->不环保 （1 代） 只有在这里 每个节点需要竞争来挖矿(区块)
  权益证明 pos->富者担保 (2 代) someone think it's not decenterly,but for engineer is ver decenterly
  一个交易发生时，其被广播，然后节点收集，进行验证和打包，一旦区块中的交易达到一定数量或特定的时间间隔，区块才会被定期创建。
- node
  每个节点都有一个副本存储区块链的完整数据，并通过与其他节点进行信息交换来实现数据同步和共识达成。节点可以是矿工（负责验证和打包交易）、验证者（负责验证交易的合法性）或普通用户（只接收和查询交易）。
- blockchain
  一旦矿工节点找到一个有效的新区块，它们会将该区块广播到整个网络中的其他节点。其他节点将接收到新区块并进行验证，然后将其添加到各自的本地区块链副本中，进而更新整个区块链的状态。
- layer1
  指区块链架构中的第一层，也被称为基础层或链上层。Layer 1 主要关注区块链的核心协议和共识机制。
  定义了区块链的基本规则和操作，包括区块的创建、交易的验证、共识算法、区块链存储等。这些规则和机制确保了区块链的安全性、去中心化性质和可靠性。

  bitcoin、ethereum 都是 layer1，layer1 存在可扩展性问题(指 区块空间不足导致写入的交易有限 导致高 gas price)

  layer2 指的是扩展层/链下层，旨在解决区块链系统在可扩展性、性能和交易吞吐量方面的限制，其包括
  链下扩展、Plasma、Sharding(eth2 将会使用)、Rollup(一种将交易数据压缩和聚合，然后将其附加到区块链的技术)等等。

- gas
  Gas 的概念源于为了限制恶意行为和滥用计算资源而设计的一种机制。
  通过 Gas 模型，区块链网络能够有效地确定交易的执行成本和优先级，并为矿工提供适当的激励来验证和打包交易。

  - Gas 模型
    每个操作有一个预算 gas
    gas price multiply usage equal transaction fee.
    基础费用
    base(It's automatically adjusted based on network congestion)
    期望的最多花费
    max(if over,then not deal)
    burnt 烧毁
    base fee 中一部分被永久烧毁 以控制通货膨胀/防止恶意干扰网络
    max priority(equal tip)
    用户可以设置一个最大优先费用，确保自己的交易能够在有限的时间内被优先处理。
    txn savings 交易节省
    较低的交易可以在网络不拥堵的时候获得优先处理的机会，从而实现交易费用上的节省。

- Sharding
  一种将整个区块链网络划分为多个更小的部分（称为分片）的技术。每个分片可以处理自己的交易和状态，从而提高整个网络的吞吐量和处理能力。
  核心原理：在分片技术中，整个区块链网络被划分为多个分片组，每个分片组具有自己的一组验证者和状态根。每个分片可以运行独立的共识算法和处理交易，从而提高整个系统的可扩展性。

  优势：分片技术可以大大提高区块链网络的吞吐量和处理能力。通过将交易和计算任务分配到不同的分片中，同时允许分片之间的通信和交互，分片技术能够将网络的负载分散到多个节点上，提高整体性能。

  缺点：实施分片技术需要面临一些挑战，如跨分片通信的复杂性、数据共享和一致性的处理等。此外，引入分片可能会增加系统的复杂性和开发成本。

## solidity

一种静态类型的，面向合约的高级语言，用于在 Ethereum 平台上实现智能合约。
说明：因为有些内容比较基层，所以文档分为了 基础/深入 两部分

### 环境

- SPDX
  通常为 SPDX-License-Identifier: MIT
- pragma
  任意个数，用于启用编译指示，对 import 内容无效
  - 版本指示 pragma solidity ^0.8.7;
  - ABI 编码指示
    v2 相对于 v1，增加了 可对嵌套数组、结构体进行编码解码、更广泛的检查
    0.8 之后默认 v2 使用 v1 需要 pragma abicoder v1;
    如果 import 一个 v2 内容,当下的 v1 依然会分别工作。
    0.74 及以下版本可选用 v2 by：pragma experimental ABIEncoderV2
    0.74~0.8 需要 pragma abicoder v2
  - 实验性
    - SMT 检查器 由于 solidity 更新快，这个东西并不准确
- import
  remix 支持识别@chain/
  import "filename" as symbolName; // equal import \* as .. from ..
  import {symbol1 as alias, symbol2} from "filename";

### types

- solidity 没有 undefined/null 的概念,默认值取决于类型。
  默认值: false 0 0x0 address:0x0(40 个) []
- 对于意外状况，使用 revert，或者一个返回 bool 的内容。
- 字面量将出现在对应类型的位置。

#### Value types

    值类型 在赋值或传递给参数时 总是 按值传递的，也就是拷贝，或者叫副本。
    bool、uint int 定长浮点型 address 合约 定/变长字节数组(类似于字符串)、字面量 都是值类型

- uint8~256
  8 16 24 等，步长为 8，比如 uint32 means 2\*\*24-1

  - 数字常量
    - solidity 没有 8 进制(即前置 0 无效),支持科学计数法 2.5e-3==0.0025,下划线帮助阅读 123_000
    - 数字字面量保留任意精度，直到被转为非字面常数。
      这意味着计算不会溢出，除法不会截断
      (2**800 + 1) - 2**800 的结果是 uint8 1 尽管中间过程是不符合
      尽量先乘法再除法
    - 数字字面量遇到与非字面量运算时，会进行转换
      unit128 a = 1; 2.5 + a 是不合法的，两个类型之间也没有共同底层类型。
  - 检查算数
    0.8 之前，solidity 都是 unchecked。但之后需要声明。 在 0.8 之前有一个 SafeMath 它使得 uint 255 + 1 报错，就像 0.8 提供的检查一样。
    unchecked 更加节省 gas。

    // (uint a, uint b)
    unchecked { return a - b; }
    return a - b;
    两者的区别是 f(2,3) 未检查的结果是 2\*\*256-1 ,第二个则会导致一个失败的断言
    从 unchecked 代码块内调用的函数不继承该属性。
    unchecked 块不应该代替代码块。
    123_4 在 unchecked 块中不被允许，因为歧义。
    溢出时，你总要考虑是要包裹，还是报错。

    位操作则不执行溢出检查

    int x = type(int).min; -x; 中的第二条语句将导致溢出， 因为负数范围可以比正数范围多容纳一个值。

- 定长浮点型,区别于浮点型,暂时不可用。
- address 一个 20 字节的值 (一个地址)
  - 成员变量
    balance uint256,余额(wei) 1eth ==10^18wei
    code 该地址的 EVM 字节码 类型是 bytes memory
    codehash 返回地址的 hash 这比 keccak256(addr.code)更加便宜
  - 一个 address 字面常数 有可能 39 或 41，需要手动到 40。
- address payable

  - 相比于 address 多了两个方法，也就是说 可以向其发送以太 因为可能有的合约与以太无关
    send(2) 向该地址发送 2wei 底层方法，失败则返回 false，比较垃
    transfer(2) 向该地址发送 2wei，失败则 revert

    使用 send 有一些危险：如果调用堆栈深度为 1024，传输就会失败（这可以由调用者强制执行）， 如果接收者的气体耗尽，也会失败。

  - address、合约转换为 address payable 时，需要显示的 payble(c)
    address payable 则可以隐式转换为 address
    对于没有 receive 和 payable 的 fallback 的合约 显然这种显示转换是不被允许的。
    payable(0) 是可以的 。。。
  - 对于不遵守 ABI 的合约，则需要更底层的方法。
    call 、delegatecall 、staticcall
    三者语法相同 address(C).call(bytes memory data) returns (bool success, bytes memory data)

    然而，调用这些底层函数等于将控制权转移给未知合约(破环了 solidity 的类型安全)，此合约回调到自身合约的话，可能出现恶意情况。

    - call 可以访问自身和被调用者的状态
      delegatecall 只是借用代码，上下文没变 所以只能改自身状态
      staticcalll 可以只读被调用者的状态，可以改变自身状态
    - address(A).call{gas: 1000000, value: 1 ether}(abi.encodeWithSignature("register(string)", "MyName"));
      意为 当前合约 调用 A 合约的名为 "register" 的函数，并传递一个字符串参数 "MyName"，调用时使用了 1000000 的 gas 和 1 ether 的以太币。
      {}内是配置项
    - gas 在三个函数中都可用,value 只在 call 中可用

- 合约
  this 当前合约、super 上一级合约 这俩是全局变量
  - 合约只能显示转换 address() payable()
  - 合约不支持任何运算符
  - 每个合约都定义了自己的类型。 type(contract)
    自 0.8.18 废弃：
    selfdstruct(address payable recipient) 销毁当前合约，将资金发送到给定地址，当前合约的所有函数都可以直接调用它，包括当前函数。它使得接收合约的接收函数不会被执行。合约只有在交易结束时才真正被销毁， 任何一个 revert 可能会 "恢复" 销毁。
- bytes1~32
  定长字节数组 例如
  bytes2 a = (0x1234 | 'aa' | 'hex'1234')
  仅当字面量的大小相符，才能赋值。
  a.length = 2;
  a[1] == 'a' 只读，不可以通过索引修改
  - 字符串字面量
    bytes32 a = 'stringliteral'
    字符串字面量只能包含 ASCII 内可打印的内容，以及转义
    \\ \' \" \n （换行） \r （回车键） \t （制表）
    \xNN 十六进制转义 、 \uNNNN unicode 转义
    其中，\xNN 接收一个十六进制值并插入相应的字节，而 \uNNNN 接收一个 Unicode 编码点并插入一个 UTF-8 序列。
    在 0.8.0 版本之前，有三个额外的转义序列。 \b， \f 和 v。 它们在其他语言中通常是可用的，但在实践中很少需要。 如果您确实需要它们，仍然可以通过十六进制转义插入， 即分别为 \x08， x0c 和 \x0b，就像其他 ASCII 字符一样。
  - Unicode 字面量
    string memory a = unicode"Hello 😃";
  - 16 进制字面常数
    hex'0011_22_FF' 和字符串字面一样 但是不能隐式转 string
  - 枚举类型
    可以显示转换为整数类型 但无隐式转换 枚举不能超过 256 个成员
  - 自定义值类型
    可以自定义 但是又更多的花费 比如说 UFiexd256x18 来表示一个定长 18 位小数的浮点型
  - 这些规则(更多没提到的)可能有些复杂,但是`实践`就好
##### 状态变量的可见性
internal (default) 只有合约内部和派生(被继承)合约可以访问
    public 编译器为其生产getter函数，任何合约可以读取
        如果内部访问一个具有getter的内容，其被当作函数：
            uint public data;
            function x() public returns (uint) {
                data = 3; // 内部访问
                return this.data(); // 外部访问
    private 派生中不可见
#### 函数
0. 函数也是值类型，至少在js、solidity中。
0. 任何内部内容都可以外部访问
  使用this.a this.a()时，视为外部访问该变量/函数
0. 格式
  function (<parameter types>) [public|internal|external|private] [pure|view|payable] [returns (<return types>)]
  - 关于return
    函数可以返回多个结果
    function f() public pure returns (uint, bool, uint) {
      return (7, true, 2);
    }
    (uint x, , uint y) = f(); // 元组(tuple)实际是存在的，但只能用于此。
    对于非内部函数，不能返回(或包含) mapping、内部函数、storage 的引用类型
        v1 中还不能返回 多维数组、结构体
1. 函数可见性
    internal(default)   派生函数可以使用内部调用。
    external   外部函数，可以供给调用该合约的外部合约使用。
    public      公开
    private    只有自身可用，派生不可用。
  - 外部调用演示
      import "a.sol"
      SomeContract sc = SomeContract(<address>)
      sc.someMethod
2. 函数类型关键字
  pure、view 函数在合约外调用也不会花费任何 `gas` 因为只是阅读.

  payable 表示此函数可以接受 eth
  pure 表示函数体中需要 对 storage 不能 读写
  view 表示函数体中需要 对 storage 仅能 读
  - 当函数并没有某些行为时,它们可以隐式转换(然并卵)
    例如 pure中没有任何关于storage的操作，实然其也是一个view
  - 以下行为被认为是修改状态
    1. 修改状态变量。
    2. 产生事件。
    3. 创建其它合约。
    4. 使用 selfdestruct。
    5. 通过调用发送以太币。
    6. 调用任何没有标记为 view 或者 pure 的函数。
    7. 使用低级调用。
    8. 使用包含特定操作码的内联汇编。
  - 以下行为都算是读取状态
    1. 读取状态变量。
    2. 访问 address(this).balance 或者 <address>.balance
    3. 访问 block， tx， msg 中任意成员 （除 msg.sig 和 msg.data 之外）
    4. 调用任何未标记为 pure 的函数
    5. 使用包含某些操作码的内联汇编
3. virtual - override
    virtual关键字 用于声明一个函数可被子合约使用override来进行重写
        Interface中，所有函数自动视为virtual
    重写规则(可行的改变)：
      non-payable   ->   non-payable view pure
      view          -> view pure
      payable       -> payable
      external      -> public
      可见性any      ->  any   ?
    常见的，调用一个外部函数时，其为 
  - 从Solidity 0.8.8开始，当重写一个接口函数时， 不需要 override 关键字，除非该函数被定义在多个基础上。

  - overload 重载，指同名，但参数不同。
    注意   public状态变量可以重载外部函数
  
  - 修饰器重写
        contract Base    {
            modifier foo() virtual {_;}
        }
        contract Inherited is Base {
            modifier foo() override {_;}
        }
4. 作用域
    uint x = 1;
    {
    x = 2; // this will assign to the outer variable
    uint x;
    }
    solidity 和 js 作用域像，但是应该先声明。也就是没有变量提升。

#### 引用类型

- 引用类型的(内存空间)分配方式(也就是赋值时的行为)可能是 copy 或引用。

- 使用一个引用类型， 必须明确地提供存储该类型的数据区域。类似于 js 的堆栈。
  storage 状态变量 寿命等同于合约的寿命
  memory 寿命等同于函数，函数结束后清除 也可以叫做内存位置
  calldata 类似于 memory，但只读
- 结构体
  结构体可以 包含/被包含在 mapping 和 array
- array
  - uint[][5] 5 个 uint 变长数组 你会发现这里写法的`反的` 但访问就不用反着来了
  - uint24[2][4] memory x = [[uint24(0x1), 1], [0xffffff, 2], [uint24(0xff), 3], [uint24(0xffff), 4]];
  * 数组元素要求
    公开可见的函数需要参数是 ABI 类型
  * 成员
    push() 返回该初始化的引用
    push(value)
    length
    pop 移除一个较大(由其是数组)的元素 成本可能很高，类似于 delete 操作
  * memory 数组不能调整大小
    例如 uint[] memory x = [uint(1), 3, 4]; 是错误的
    转而 uint[] memory x = new uint[](3); x[0] = 1; ...
  * 要在外部（而不是公开）函数中使用数组中的数组， 您需要激活 ABI coder `v2`。
  * 避免 对 storage 数组的 悬空引用
    悬空引用是指一个指向不再存在的或已经被移动而未更新引用的内容的引用。
    每条语句只对存储进行一次赋值，并避免在赋值的左侧使用复杂的表达式，这样做总是比较安全的。
  * 数组切片 x[start:end] 不包尾
    仅能存在于中间表达式中，没有成员、类型，暂时只有 calldata 数组可以使用。
    例如 bytes4 sig = bytes4(payload[:4]); 由于截断行为 不切片也行
- bytes、string 这是特别的数组
  string 与 bytes 相同，但不允许用长度或索引来访问。
  bytes.concat 返回 bytes memory 数组 还可以连接 bytes1~31
  string.concat
  可以在函数中 new bytes(len)，但之后大小不可改变。
  storage 则可以。

  如果您能将长度限制在一定的字节数，并且确定数组是固定长度的，则使用 bytes1~32 会更具成本效益。
  但是对于长度可变的数组或在 calldata 中使用的数组，bytes 类型可能更合适，并避免了填充字节的开销。

- 数组字面量(值类型)
  - 无效的 [1, -1]
    因为 1 是 uint,数组的类型要求是 其它元素可以隐式转为第一个元素的类型，否则类型错误。转而，可以[int8(1),-1]
- mapping
  mapping(KeyType KeyName? => ValueType ValueName?) VariableName
  KeyType 可以是内置的值类型以及 bytes、string
  ValueType 任意类型

  - 映射只能是 storage
  - 映射并不是 Iterable 不过有库可以，就是一个上层的实现 file:///E:/technology/web3/solidity-docs-chinese-0.8.20/index.html#iterable-mappings

#### operate

    算术运算 默认情况下，算术总是 “检查” 模式的，这意味着如果一个操作的结果超出了该类型的值范围， 调用将通过一个 失败的断言 而被恢复。
    右移对象必须为uint,其结果向左侧取整。 for example, 5>>2 == 5/(2**2) ==1.25->1
    一元运算 -a，对象必须为int
    除法  整数除法向0进位,字面上
        type(int).min / (-1) 是除法导致溢出的唯一情况 ，而在包装模式下，值将是 type(int).min
    幂运算 相对于x**3 x*x*x更加便宜
        通过基准测试和优化实验来确定合适的小基数范围
    EVM定义: 0 ** 0 =1
    三元 a?b:c
    删除 delete a 将会对a分配初始值 也就是说其实是一个赋值操作

        对数组使用delete a[x]不是一个好主意 如果需要删除 a应该是一个mapping而非array
        删除一个结构体时不会影响到内部的mapping
    优先级 file:///E:/technology/web3/solidity-docs-chinese-0.8.20/index.html#order

#### 类型转换

    + 整数
        隐式的 int 不能转为uint
        显示的 int y = -3; uint x = uint(y) 则得到0xf..(一共64位)..fd
        转换大/小类型会在左侧 补位/截断
            uint32 a = 0x12345678; uint16 b = uint16(a); // 0x5678
            补位的话全是0
    + 字符
        右侧截断/补位
            bytes2 a = 0x1234;
            bytes1 b = bytes1(a); // b 现在会是 0x12
    + 由于上面补位规则，只有相同大小的 整数/固长字节数组 之间可以显示转换
        也就是可能需要中间转换
        bytes2 a = 0x1234;
        uint32 b = uint16(a); // b 将会是 0x00001234
        bytes和切片转为bytes1~32也要小心截断情况
    + 明确的类型转换将总是截断，并且永远不会导致失败的断言，但从整数到枚举类型的转换除外。

使用 public 则 solidity 会自动创建 getter 函数

#### 截断规则

addmod(uint x,uint y,uint k) returns (uint)
视为字面量计算(x+y)%k 并返回,不截断
mulmod(uint x,uint,y,uint k) 乘

### 全局变量、单位

#### assert、require、revert、try/catch

##### 基础

示例见于 FundMe.sol。

- assert(bool)、require(bool) 断言/或者叫评估
  assert 是内部逻辑校验，更多的是编译器在使用，比如 除数!=0,如果由类似的需求那么就使用 assert。
- require(bool, string) 同时提供一个错误消息。
- 0.8.4 之后，可以使用自定义错误 不必再存储字符串，
- revert()
  终止运行并恢复状态更改。
- revert(string)
  终止运行并恢复状态更改，可以同时提供一个解释性的字符串。

##### 细节

- 注意
  在 require(condition, f()) 中，即使 condition 为真， 函数 f 也被执行。
- 成员
  error.selsector 一个包含错误类型的选择器的 bytes4 值
- Solidity 使用 状态恢复异常(恢复所有更改并使整个交易（或至少是调用）不产生效果。) 来处理错误。
- 当异常发生在子调用中时，它们会自动 "冒泡"（也就是说，异常被重新抛出）， 除非外部调用被 try/catch 语句捕获。
  这个规则的例外是 send 和低级函数 call， delegatecall 和 staticcall： 它们在发生异常时返回 false 作为第一个返回值而不是 "冒泡"。如果被调用的账户不存在，低级函数 call， delegatecall 和 staticcall 的第一个返回值为 true.

- 通过 assert 会引起 Panic(uint256)异常（在无错误代码中不应该出现的错误），而通过 require 引起 Error(string)异常（"常规" 错误条件）。Assert 应该只用于测试内部错误，以及检查不变量。Panic 就不应该出现(语言分析工具会帮助你发现它)。
  异常被触发的情况： file:///E:/technology/web3/solidity-docs-chinese-0.8.20/index.html#assert-panic-require-error

- try/cacth
  try 关键字后面必须有代表外部函数调用或合约建的内容  
   调用者可以使用 try/ catch 对这种失败做出处理
  但被调用者的变化将总是被恢复。
  可供选择的 catch：
  Solidity 根据错误的类型，支持不同种类的捕获块：

        catch Error(string memory reason) { ... }： 这个catch子句会被执行， 如果错误是由 revert("reasonString") 或 require(false, "reasonString") 造成的 （或内部错误造成的）。

        catch Panic(uint errorCode) { ... }： 如果错误是由Panic异常引起的， 例如由失败的 assert、除以0、无效的数组访问、算术溢出和其他原因引起的，这个catch子句将被运行。

        catch (bytes memory lowLevelData) { ... }： 如果错误签名与其他子句不匹配， 或者在解码错误信息时出现了错误，或者没有与异常一起提供错误数据， 那么这个子句就会被执行。在这种情况下，声明的变量提供了对低级错误数据的访问。

        catch { ... }： 如果您对错误数据不感兴趣，您可以直接使用 catch { ... } （甚至作为唯一的catch子句）来代替前面的子句。

        计划在未来支持其他类型的错误数据。字符串 Error 和 Panic 目前是按原样解析的，不作为标识符处理。

        为了捕捉所有的错误情况，您至少要有 catch { ...} 或 catch (bytes memory lowLevelData) { ... } 子句。

#### recive、fallback

recive 用于合约接收 eth，fallback 作为一个合约的应急函数，可见于例子 FundMe.sol。
这是两个特殊的函数，不用 function 关键字，可以是 virtual，可以重载，也可以有修饰器。
根据二者其目的，显然它是 external、payable 的。

- fallabck
  除了 fallback() external [pable] 还可以
  fallback (bytes calldata input) external [payable] returns (bytes memory output)
  如果使用带参数的版本， input 将包含发送给合约的全部数据（等于 msg.data），
  并可以在 output 中返回数据(这个数据会不是 ABI-encoded)。
  在最坏的情况下，如果一个可接收以太的 fallback 函数也被用来代替接收功能， 那么它只有 2300 气体是可用的。
  这意味着 除了基本的记录外，几乎没有空间来执行其他操作。 很多操作将超出这个 gas 范围。

#### Constant、Immutable

目前支持的类型是 字符串类型(仅用于 constant)和 value type。
状态变量可以被声明为 constant 或 immutable。 在这两种情况下，变量在合约构建完成后不能被修改。
对于 constant 变量，其值必须在编译时固定， 而对于 immutable 变量，仍然可以在构造时分配。

- gas 成本: 常量 constant<不可变量 immutable<普通

#### modifier

    通过contract.m 访问一个修饰器
    只能使用定义在当前合约或其基础合约中的修饰器。
    修饰器也可以定义在库合约中，但其使用仅限于同一库合约的函数。

#### 合约、block

合约有 this、super 略

blockhash

#### 时间单位

这些时间单位确实可以作为后缀在字面常数后面，用于指定时间单位
但是不能应用于变量，不过 1\*1 days == 1days
1 == 1 seconds
1 minutes == 60 seconds
1 hours == 60 minutes
1 days == 24 hours
1 weeks == 7 days // 没有 years 需要链外数据服务，考虑闰秒

#### keccak256、sha256、ecrecover

参见 file:///E:/technology/web3/solidity-docs-chinese-0.8.20/index.html#mathematical-and-cryptographic-functions

    keccak256(bytes memory) returns (bytes32)
    sha256(bytes memory) returns (bytes32)   SHA-256
    RIPEMD160  类似于SHA-1

    ecrecover(bytes32 hash,uint8 v,bytes32 r,bytes32 s) returns (address)
        利用椭圆曲线签名恢复与公钥有关的地址  错误返回零值
        r = 签名的前32字节
        s = 签名的第二个32字节
        v = 签名的最后1个字节

### Evevts Logs

Evevts 和 Logs 存在于一种智能合约无法访问的特殊数据结构中，所以更省 gas
event 的参数有两种 indexed 以及默认的 unindexed
最多有 3 个 indexed，也成为 topic,其花费更少

## ethers.js

powered by ethers.org/v6 6.7.1

### first

- some common terminology
  Provider、Signer、Transaction、Contract、Receipt
  MetaMask is a Provider&Signer. Because read-only access (by ethereum network)and write access(by privateKey).
  To make any state changes to the blockchain, a transaction is required，even revert.
  交易被认为成功则从 memory pool 提交到区块中，此时发票可用，其包括交易的详细信息。

- connecting to Ehereum
  If MetaMask is not installed,search the first half of this sentence.
  Besides MetaMask,a JsonPrcProvider is ok,such like ganache or hardhat.
  rpc "Peer-to-Peer Remote Procedure Call"（点对点远程过程调用）

- User Interaction
  decimals and floating points is non-obvious for computer,so use larger number.

  let a = parseEther("1.0") // 1000000000000000000n n 表示 BigInt 类型
  parseUnits("4.5", "gwei")// 4500000000n
  可逆 formatEther(a)、formatUnits(,'gwei')

### ABI

了解就行了

- 通过 ABI 编码和解码，开发人员可以在与合约交互时确保数据的一致性和正确性。
- AbiCoder 类可以方便地进行编码(js 编码为 bin)和解码操作。更好的， Contract 类则提供了更高层次的抽象，简化了与合约的交互。
- Fragments
  一个 ABI 中，每个 fragment 都是一个独立的部分，这就是相当于把 function a 解析为 F(a),与其它部分独立，很合理。
  包括了 constructor error event fallback function json Named struct 后面全加 Fragment
  以及 paramType jsonFramentType。
- 底层方法
  decodeBytes32String(bytesLike) => string
  encodeBytes32String(text) => bytes 具体细节可以看源码
- class
  - Interface
    一个低级别的类，它接受 ABI 并提供所有必要的功能，用于对方法、事件和错误的参数和结果进行编码和解码。
    它还提供了一些方便的方法来自动搜索和查找匹配的事务和事件以解析它们。
    - 详细来说，包括
      new Interfaces(fragments) 、Interface.from()
      i.fragement .deploy .fallback .receive
      .decodeSomething() .format() .parseLog() .parseTranscation() .parseError()
  - ErrorDescription
    revert 时 interface.parseError 会被调用，返回一个这个。
    e.name 错误名称 e.args revert 传递的参数 e.selector .signature .fragment
  - LogDescription
    interface.parseLog 返回一个这个，相比 ErrorDescription,多了 topic,少了 selector.
  - TransactionDesciption
    t.args t.value .fragemnt .name .selector .signature
- Typed value 类型化
  在类型化的概念下，每个值都有一个明确的类型。
  - class Typed
    - 创建类型化内容
      T.array() address bool bytes bytes1~32 int int8~256 uint uint8~256 string tuple overrides
    - 静态
      T.dereference() 对于希望接受 Typed 对象或值的函数非常有用
      T.isTyped()
    - 实例
      t.arrayLength .tupleName .type .value
      .defaultValue() .format() .isBigInt() .max|minValue()
  - 子类
    TypedBigInt TypedData TypedString

### addresses

- types AddressLike => string|Promise<string>|Addressable
  Anything that can be used to return or resolve an address.

- interface Addressable
  a.getAddress() => Promise<string>
- interface NameResolver
  An interface for any object which can resolve an ENS name
  n.resolvName()

getAddress(address) 返回规范化的 address
isAddress()
resolveAddress()
例如 addr = "0x6。。 contract = new Contract(addr, [ ])
resolveAddress(contract, provider) // Promise<'0x6。。

isAddressable(v) 如果 v 继承了 Addressable 接口，则 ture
getCreate2Address(from,salt,hash) 返回一个加盐地址
getCreateAddress(tx)
getIcapAddress Icap 是过时的。

### Constants

console.log(ethers)能找到
MaxInt256 MaxUint256
N(secp256k1 曲线的 N 阶常数。一个比 MaxUint256 小一些的数)  
MinInt256 + Max == -1
ZeroAddress(0x40 个 0) ZeroHash 0x 更多的 0
WeiPerEther 1\*\*10^18

### Contracts

它与区块链上部署的智能合约通信，并提供一个简单的 JavaScript 接口来调用方法、发送事务、查询历史日志和监听其事件。

#### BaseContract

```js BaseContract
// deploy1对sim.sol打印的
BaseContract {  // 实现了Addressable接口
  target: '0xbE4C49EC96bCFA97Bbbe45C58062ca2A9249C74a',
  interface: Interface {
    fragments: [
      [FunctionFragment],
      [FunctionFragment],
      [FunctionFragment],
      [FunctionFragment],
      [FunctionFragment]
    ],
    deploy: ConstructorFragment {
      type: 'constructor',
      inputs: [],
      payable: false,
      gas: null
    },
    fallback: null,
    receive: false
  },
  runner: Wallet {
    provider: JsonRpcProvider {},
    address: '0xeBc99455A2Ae013b6D097239F001e3ACa29B72f5'
  },
  filters: {},
  fallback: null,
  [Symbol(_ethersInternal_contract)]: {}
}
```

- class ContractFactory
  let c = new ContractFactory(abi,bin,?wallet) // wallet 此时作为 ContractRunner
  c.attach(addressable)
  c.connect(?ContractRunner) 返回一个新的 ContractFactory，它具有相同的 ABI 和字节码，但是连接到 runner。
  c.deploy(args) => Promise<Contract>
  准确的说，是 Promise< BaseContract & { deploymentTransaction: ContractTransactionResponse } & Omit< I, keyof<BaseContract> > > 意为 一个同时具有 BaseContract 类型的属性、{ deploymentTransaction: ContractTransactionResponse } 类型的属性，并且排除掉 BaseContract 类型的属性之外的 I 类型。
  ContractFactory.fromSolidity(output: any, runner?: ContractRunner)⇒ ContractFactory < A, I >
  Create a new ContractFactory from the standard Solidity JSON output.

## sol in vscode

### 环境准备

- 安装插件 solidity

- 配置 usersetting{
  "[solidity]": {
  "editor.defaultFormatter": "NomicFoundation.hardhat-solidity"
  },
  "editor.formatOnSave": true
  }
  node 16+
  yarn add solc@0.8.7-fixed 指定版本
  yarn solcjs --bin --abi --include-path node_modules/ --base-path . -o . SimpleStorage.sol
  --include-path node_modules/ 也编译 node_modules 中的内容
  --base-path . 表示其实路径为.
  -o . 意为 编译出来的内容也在这个文件夹

* Ganache
  下载 https://trufflesuite.com/ganache/
  它可以在本地计算机启动一个假的区块链，类似于 Remix 中的 Remix VM(之前叫 js VM)
  Remix 中的 Inject web3 则是连接到了 metaMask
  如果想运行一个真正的节点 而非 metaMask 试试 go ethernum

  Ganache 的 set->serve->hostname 选 wsl(如果使用了 wsl 没就不用)
  然后 provider 是 RPC SERVER wallet 随便找个地址的密钥
  例子见 deploy1.mjs mjs 是使用 esm 的方式 它跑起来了！

* ethers.org
  yarn add ethers

### 简单例子

见 project1

- abi
  decompile 有一些 decompile 可以将 bin 翻译回来,但是没有 abi 很有可能出错.
  可以把.abi 改为.json 然后>format 方便阅读
- privateKey
  这里涉及到了安全问题 见 deploy1 的注释

- alchemy
  现在可以不用 Ganache 了
  转而 复制项目 API KEY 中的 http 到.env
  复制钱包私钥
- 生成.encryptedKey.json 然后运行 deploy1.mjs
  可以看到生成的 constract 以及在 alchemy 上发布的 app
  以及 etherscan
- Verify and Publish
  现在的代码是一团字节码，别人在链上难以阅读。
  这时候可以在 浏览器用 etherscan 或者 使用代码来 Verify and Publish 现在所有人都可以看到源码
- 使用 ts
  yarn add typescript ts-node
  安装对应 ts 库 yarn add @types/fs-extra
  然后运行 ts-node depoly1.ts
  把需要加类型的地方加上

### hardhat

yarn init
yarn add --dev hardhat
yarn hardhat compile 编译 deploy 生成 artifacts
yarn hardhat clean // 清除 artifacts 和 cache
yarn add --dev prettier prettier-plugin-solidity
yarn add --dev dotenv
yarn hadhat run script/deploy.mjs
yarn hardhat run scripts/deploy.mjs --network sepolia  
yarn add --dev @nomiclabs/hardhat-etherscan // for verify
task 任务 和脚本没什么区别 写法见 tasks 文件夹
yarn hardhat node 类似 ganache 的虚拟环境 见 hardhat.config.js
yarn hardhat console // 进入控制台 可以输入 let a =2; 方便交互
yarn hardhat console --network sepolia
yarn hardhat test 见 test  
yarn hardhat test --grep <keywords> //指定某个 it 内的 description 然后只执行它
yarn add --dev solidity-coverage 如果存在没有被测试的代码，它会告诉我们 yarn hardhat coverage

### fundme

yarn sollint contracts/\*.sol 就是 lint

- yarn add --dev hardhat-deploy 只部署一个版本太麻烦了，这个帮忙
  - 其会增加一堆 task 其中有一个 depoly，也就是可以 yarn hardhat deploy
    新建 deploy 文件夹，每次此命令都会导致该文件夹的脚本运行 .tags 则可以只运行一个 见 00-deploy-mock
  - yarn add --dev @nomiclabs/hardhat-ethers@npm:hardhat-deploy-ethers ethers
    中间的@是 override，效果是在 package.json 会发现@nomiclabs/hardhat-ethers": "npm:hardhat-deploy-ethers" 也就是后面把前面覆盖了

使用动态的 pricefeed 见 fundme.sol 01-deploy-fundme.js
接着找到喂价地址 ethUsdPriceFeedAddress

- 现在 yarn hardhat compile 不行 网络连不上 再试试 然后试试 deploy 以及测试网
  把网络->适配器选项 ipv4->从 114 改为了自适应 架梯子 就好了 瞎蒙的

- test
  uint 单元测试
  Staging/integration 暂存/集成测试 测试网时 比如 yarn hardhat test --network sepolia
  所以在 test 中能看到两种不同的测试
- debug
  使用断点 侧边栏图表 然后可以看到情况

- fund.js
  一个 fund 脚本 使用 yarn hardhat run sciprts/fund.js --network localhost

- by the way 那个 99 是课后作业 用来模拟多个账户干啥来着。。。。

### Lottery /ˈlɒtəri/ n.彩票 Raffle /ˈræf(ə)l/ n.废物 v.抽彩票

- VRF V2
  VRF 请求从订阅帐户获得资金。Subscription Manager 允许您创建帐户并预付费 VRF 请求，以便在一个位置管理所有应用程序请求的资金。就像把钱都押到桌面上。

  操作来说，在 chainlink 的 vrf 那里，点击 Create Subscription，使用您的钱包地址创建订阅 ID。当请求一个随机值时，订阅 ID 将在您的合同中使用。

- yarn global add hradhat-shorthand
  更短的命令 yarn hardhat compile -> hh compile

- 流程
  首先 编写 合约.sol 然后根据合约需求编写deploy及其mock版本 测试：你可以选择每完成一部分就进行测试
  
## Remix
  其可以自动识别@chainlink/contracts而非需要手动引入

## chainlink
以太坊上的去中心化预言机（oracle）网络，用于提供可靠的外部数据到区块链中。
### Price Feed
"喂价"（或称为价格喂养）是指将外部数据源中的价格信息引入到区块链中，以供智能合约和去中心化应用程序（DApps）使用。
    喂价的目的是为了使智能合约能够依赖可靠的、来自现实世界的价格数据。
### Chainlink VRF
链上的随机数可不够随机。
0. 快速上手
  https://docs.chain.link/vrf/v2/subscription/examples/get-a-random-number
1. 介绍
   Verifiable Random Function 可验证随机函数
   是一个可证明公平和可验证的随机数生成器(RNG)，它使智能合约能够在不影响安全性或可用性的情况下访问随机值。
   对于每个请求，Chainlink VRF 生成一个或多个随机值和如何确定这些值的加密证明。
   在任何消费应用程序可以使用它之前，证明在链上被发布和验证。
   这一过程确保了结果不会被任何单一实体(包括 oracle 运营商、矿工、用户或智能合约开发人员)篡改或操纵。

2. 请求随机性的两种方法
   Subscription  一个订阅最多支持100个consuming contracts
   Direct funding
  - 区别
     订阅方式不需要合约创建者事先拥有 LINK 代币，费用会在随机数生成后自动扣除。而直接资助方式需要合约创建者预先准备 LINK 代币并存入基金池。
     订阅方式对于简化合约创建者的操作更有利，而直接资助方式则允许更精准地控制费用和资金。
    考虑gas 似乎订阅总是合适的
4. 这个的gas 成本计算包括gas price、cb gas(回调函数和请求中随机值的数量)、verification gas （验证random所需的gas)。
  只有在事务完成后，每个请求的成本才是最终的，但是您可以使用以下变量定义您愿意为请求花费的限制:
  gas lane : 最高愿支付的gas
    在request中，使用合适的[keyHash](在文档的supported networks部分)来进行gas上限的选择
  cb gag limit : 在cb中最高愿支付的gas 
    在request中选择合适的[callbackGasLimit]
5. 对于一个消费合同(consuming contract)
  1. contract must inherit VRFConsumerBaseV2
  2. 实现fulfillRandomWords函数，处理返回到合约中的随机值
  3. 调用VRF协调器的requestRandomWords来提交您的VRF请求
    包括 
    keyHash s_subscriptionId requestConfirmations(等待区块传播数量) 
    numWorks (要请求随机数的个数，随机数的最大值暂时是500)
### Automation 之前叫keeper
可以创建各种自动化任务，如定期数据聚合、报价更新、周期性支付、状态转换等。


## ERC-20 代币标准
ERC-20是在以太坊区块链上创建可替代令牌的技术 `标准`。
可替换的令牌可以彼此互换，这意味着每个令牌与相同类型的任何其他令牌相同。
另一方面，不可替代令牌(nft)是唯一的，不可互换的。
NTFs(Non-fungible tokens)比如 数字藏品，是唯一的，不可分割的。ft比如eth，是可分割的(10个单位拆分成两个5单位)，可以互换的。

erc_20中模拟一个eth
## ERC-721
就是NTFs
还有一个是ERC-1155这是半可代替标准

## next.js
pages下的文件对应客户端路由
    index.js 是 /
    _app.js是app根
把nextjs应用部署到Vercel是中心化的部署方式

## IPFS
他只是托管代码，并不是服务器

对前端代码使用yarn next export 得到out文件夹 用于使用在IPFS
  这个命令只能构建静态页面  SSR不被允许

除了上述手动，使用fleek.co可以自动部署(每次提交github 都会自动部署)
  git init -b main   git add . git remote add <一个新的远程仓库>
  然后git push 
  接着进入fleek.co连接 
    framework选择next.js
    build command 使用yarn
    其它应该都是不用动的
    以上即使弄错提交后依然可以更改 
    接着Tirrge deploly
  
之后看到Firecoin deal id 、current IPFS hash(可以访问ipfs://<youhash>)

## DeFi
去中心化金融，或“DeFi”，是指新兴的基于区块链的无需许可且透明的金融服务生态系统。
* Stablecoins
稳定币是 DeFi 的核心组成部分，它允许美元等法定货币和其他资产在区块链上以数字代币的形式表示。稳定币是基础资产的代表，并试图通过各种机制与其保持 1:1 的挂钩。
* Decentralized Exchanges (DEXs)
去中心化交易所,一个子集，称为Automated Market Makers（AMM）典型的例如 SushiSwap、Uniswap
* Decentralized Money Markets
去中心化货币市场 例如Aave、Compound和CREAM
是 借款人和贷款人联系的场所。借入资金或从闲置资本中赚取收益的能力产生了大量的经济活动。

* Uniswap
是一个建立在以太坊区块链上的去中心化加密货币交换协议。它允许用户直接从他们的钱包中交易ERC-20代币，而不需要中介。以下是如何使用Uniswap的分步指南
连接钱包app.uniswap.org 选择网络 交易金额
需要注意的是，Uniswap收取两种费用:
Network Fees
LP Fees 类比于矿工奖励
Uniswap被认为是加密领域最安全、最可靠的协议之一。所有合约都经过专业安全团队的审核，该协议已经处理了超过1.5万亿美元的交易量，没有发生任何事件。