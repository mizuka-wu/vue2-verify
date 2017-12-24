# vue2-verify

> 基于[https://github.com/Hibear/verify](https://github.com/Hibear/verify) 的验证码项目  
> 项目验证码类型[请查看](http://veui.net/)

## 支持的验证码类型  

1. **常规验证码picture** 常规的验证码由数字和字母构成，用户输入不区分大小写，可变形成汉字验证。 
2. **运算验证码compute** 运算验证码主要通过给出数字的加减乘运算，填写运算结果进行验证。 
3. **滑动验证码slide** 通过简单的滑动即可完成验证，应用与移动端体验很好。  
4. **拼图验证码puzzle** 拼图。 
5. **选字验证码pick** 通过按顺序点选图中的汉字完成验证，ie浏览器要求9或以上。  

## 请记住一件事！
> 纯前端是可以被别人绕过验证的!

## todo
1. 传到npm
2. 添加在线演示和修改

## 文档
### 常规验证码picture
#### 参数说明
<table >
<tr>
<th>参数</th>
<th>说明</th>
</tr>
<tr>
<td><code>type</code></td>
<td>常规验证码type为picture或者1</td>
</tr>
<tr>
<td><code>width</code></td>
<td>常规验证码的宽,支持百分比形式设置，如：width:100%。</td>
</tr>
<tr>
<td><code>height</code></td>
<td>常规验证码的高,支持百分比形式设置，如：height:10%。</td>
</tr>
<tr>
<td><code>fontSize</code></td>
<td>常规验证码中的字母&amp;数字的字体大小，默认为30px。</td>
</tr>
<tr>
<td><code>codeLength</code></td>
<td>常规验证码中显示的验证码个数，默认为6。</td>
</tr>
</table>


### 运算验证码
#### 参数说明
<table >
<tr>
<th>参数</th>
<th>说明</th>
</tr>
<tr>
<td><code>type</code></td>
<td>常规验证码type为compute或者2</td>
</tr>
<tr>
<td><code>figure</code></td>
<td>运算验证码的位数,默认是100以内的数字，即两位数。如果是要设置三位数，则设置figure:1000。</td>
</tr>
<tr>
<td><code>arith</code></td>
<td>算法选择，支持加、减、乘。设置为1至3分别代表加减乘，0为随机切换。。</td>
</tr>
<tr>
<td><code>width</code></td>
<td>运算验证码的宽,支持百分比形式设置，如：width:100%。</td>
</tr>
<tr>
<td><code>height</code></td>
<td>运算验证码的高,支持百分比形式设置，如：height:10%。</td>
</tr>
<td><code>fontSize</code></td>
<td>运算验证码中的数字的字体大小，默认为30px。</td>
</tr>
</table>





